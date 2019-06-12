import request from 'supertest';
import sinon from 'sinon';
import 'sinon-mongoose';
import { server, db } from '../index';
import { BAD_REQUEST, OK } from '../configs/httpStatusCodes';
import Issue from '../models/issue';
import Lifecycle from '../models/lifecycle';

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

    test('should return 400 if issue or createdBy fields are not sent', (done) => {
      request(server)
        .post('/issues')
        .send({ lifecycleid: '123456789abc' })
        .expect(BAD_REQUEST, done);

      request(server)
        .post('/issues')
        .send({ lifecycleid: '123456789abc', issue: 'A new issue' })
        .expect(BAD_REQUEST, done);

      request(server)
        .post('/issues')
        .send({ lifecycleid: '123456789abc', createdBy: '1234567890ab' })
        .expect(BAD_REQUEST, done);
    });

    test('should receive 200 if all three parameters are sent', (done) => {
      const IssueMock = sinon.mock(Issue);
      IssueMock.expects('create')
        .withArgs({ issue: 'A new issue', createdBy: '1234567890ab' })
        .resolves({ issue: 'A new issue' });

      const LifecycleMock = sinon.mock(Lifecycle);
      LifecycleMock.expects('findOneAndUpdate')
        .withArgs({ _id: '123456789abc' }, { $push: { issues: '1234567890' } })
        .resolves();

      request(server)
        .post('/issues')
        .send({ lifecycleid: '123456789abc', issue: 'A new issue', createdBy: '1234567890ab' })
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
});
