import request from 'supertest';
import sinon from 'sinon';
import 'sinon-mongoose';
import { server, db } from '../index';
import { BAD_REQUEST, OK } from '../configs/httpStatusCodes';
import Issue from '../models/issue';
import Lifecycle from '../models/lifecycle';
import Comment from '../models/comment';

describe('URL/issues routes', () => {
  beforeAll(() => {
    server.close();
  });

  afterAll(() => {
    db.close();
    server.close();
  });

  describe('POST /issues/', () => {
    test('should return 400 if lifecycleid is not passed', (done) => {
      request(server)
        .post('/issues')
        .expect(BAD_REQUEST, done);
    });

    test('should return 400 if issue is not sent', (done) => {
      request(server)
        .post('/issues')
        .send({ lifecycleid: '123456789abc' })
        .expect(BAD_REQUEST, done);
    });

    test('should receive 200 if all parameters are sent', (done) => {
      const IssueMock = sinon.mock(Issue);
      IssueMock.expects('create')
        .withArgs({ issue: 'A new issue' })
        .resolves({ issue: 'A new issue' });

      const LifecycleMock = sinon.mock(Lifecycle);
      LifecycleMock.expects('findOneAndUpdate')
        .withArgs({ _id: '123456789abc' }, { $push: { issues: '1234567890' } })
        .resolves();

      request(server)
        .post('/issues')
        .send({ lifecycleid: '123456789abc', issue: 'A new issue' })
        .expect(OK)
        .end(() => {
          LifecycleMock.restore();
          IssueMock.restore();
          return done();
        });
    });
  });

  describe('GET /issues/:issueid', () => {
    test('should receive 400 if issueid is invalid', (done) => {
      request(server)
        .get('/issues/abcd')
        .expect(BAD_REQUEST, done);
    });

    test('should receive 404 if issueid is valid but issue does not exist', (done) => {
      const nonExistingIssue = '5d0023ad707e692c9847fb30';
      const IssueMock = sinon.mock(Issue);
      IssueMock.expects('findById')
        .withArgs(nonExistingIssue)
        .chain('populate')
        .withArgs('createdBy')
        .chain('exec')
        .resolves(null);

      request(server)
        .get('/issues/5d0023ad707e692c9847fb30')
        .expect(OK)
        .end(() => {
          IssueMock.restore();
          return done();
        });
    });

    test('should receive 200 if issueid is valid', (done) => {
      const existingIssue = '5d0023ad707e692c9847fb37';
      const IssueMock = sinon.mock(Issue);
      IssueMock.expects('findById')
        .withArgs(existingIssue)
        .chain('populate')
        .withArgs('createdBy')
        .chain('exec')
        .resolves({ issue: 'issue one' });
      request(server)
        .get('/issues/5d0023ad707e692c9847fb37')
        .expect(OK)
        .end((err, res) => {
          IssueMock.restore();
          return done();
        });
    });
  });

  describe('PATCH /issues/:issueid/assignee', () => {
    test('should receive 400 if issueid is not valid', (done) => {
      request(server)
        .patch('/issues/abcd/assignee')
        .expect(BAD_REQUEST, done);
    });

    test('should receive 400 if invalid assigneeid is sent', (done) => {
      request(server)
        .patch('/issues/abcd/assignee')
        .send({ assigneeid: '1234' })
        .expect(BAD_REQUEST, done);
    });

    test('should receive 404 if issueid is valid but not present in db', (done) => {
      const nonExistingIssue = '5cfb0915a8e23e5b65d10722';
      const assigneeid = '5cfb09be8ec3955b97ec00bd';
      const updateObject = { $set: { assignee: assigneeid } };
      const IssueMock = sinon.mock(Issue);
      IssueMock.expects('findOneAndUpdate')
        .withArgs(nonExistingIssue, updateObject, { new: true })
        .resolves(null);

      request(server)
        .patch('/issues/abcd/assignee')
        .send({ assigneeid })
        .expect(BAD_REQUEST)
        .end(() => {
          IssueMock.restore();
          return done();
        });
    });

    test('should receive 200 if assignee is present', (done) => {
      const existingIssue = '5cfb0915a8e23e5b65d10022';
      const assigneeid = '5cfb09be8ec3955b97ec00bd';
      const updateObject = { $set: { assignee: assigneeid } };
      const IssueMock = sinon.mock(Issue);
      IssueMock.expects('findOneAndUpdate')
        .withArgs(existingIssue, updateObject, { new: true })
        .resolves({ _id: existingIssue, assignee: assigneeid });

      request(server)
        .patch('/issues/abcd/assignee')
        .send({ assigneeid })
        .expect(OK)
        .end(() => {
          IssueMock.restore();
          return done();
        });
    });
  });

  describe('PATCH /issues/:issueid/duedate', () => {
    test('should receive 400 if issueid is not valid', (done) => {
      request(server)
        .patch('/issues/abcd/duedate')
        .expect(BAD_REQUEST, done);
    });

    test('should receive 404 if issueid is valid but not present in db', (done) => {
      const nonExistingIssue = '5cfb0915a8e23e5b65d10722';
      const dueDate = new Date();
      const updateObject = { $set: { dueDate } };
      const IssueMock = sinon.mock(Issue);
      IssueMock.expects('findOneAndUpdate')
        .withArgs(nonExistingIssue, updateObject, { new: true })
        .resolves(null);

      request(server)
        .patch('/issues/abcd/assignee')
        .send({ dueDate })
        .expect(BAD_REQUEST)
        .end(() => {
          IssueMock.restore();
          return done();
        });
    });

    test('should receive 200 if assignee is present', (done) => {
      const existingIssue = '5cfb0915a8e23e5b65d10022';
      const dueDate = new Date();
      const updateObject = { $set: { dueDate } };
      const IssueMock = sinon.mock(Issue);
      IssueMock.expects('findOneAndUpdate')
        .withArgs(existingIssue, updateObject, { new: true })
        .resolves({ _id: existingIssue, dueDate });

      request(server)
        .patch('/issues/abcd/assignee')
        .send({ dueDate })
        .expect(OK)
        .end(() => {
          IssueMock.restore();
          return done();
        });
    });
  });

  describe('POST /issues/:issueid/comment', () => {
    test('should return 400 if comment is not sent', (done) => {
      request(server)
        .post('/issues/5cfb0915a8e23e5b65d10725/comment')
        .expect(BAD_REQUEST, done);
    });

    test('should return 400 if issueid is not valid', (done) => {
      request(server)
        .post('/issues/abcd/comment')
        .send({ comment: 'A comment' })
        .expect(BAD_REQUEST, done);
    });

    test('should receive 200 if all three parameters are sent', (done) => {
      const CommentMock = sinon.mock(Comment);
      CommentMock.expects('create')
        .withArgs({ comment: 'A comment' })
        .resolves({ issue: 'Updated issue with a comment' });

      const IssueMock = sinon.mock(Lifecycle);
      IssueMock.expects('findOneAndUpdate')
        .withArgs({ _id: '123456789abc' }, { $push: { comments: '1234567890' } })
        .resolves();

      request(server)
        .post('/issues/5cfb0915a8e23e5b65d10725/comment')
        .send({ comment: 'A comment' })
        .expect(OK)
        .end(() => {
          CommentMock.restore();
          IssueMock.restore();
          return done();
        });
    });
  });
});
