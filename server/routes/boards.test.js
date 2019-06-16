import request from 'supertest';
import sinon from 'sinon';
import { server, db } from '../index';
import 'sinon-mongoose';
import Board from '../models/board';
import Lifecycle from '../models/lifecycle';
import { BAD_REQUEST, OK } from '../configs/httpStatusCodes';

describe('URL/boards/', () => {
  beforeAll(() => {
    server.close();
  });

  afterAll(() => {
    db.close();
    server.close();
  });

  describe('Get boards by user', () => {
    test('should return list of boards', (done) => {
      const BoardMock = sinon.mock(Board);
      BoardMock.expects('find').resolves({ name: 'New Board Name' });
      request(server)
        .patch('/boards')
        .expect(OK)
        .end(() => {
          BoardMock.restore();
          return done();
        });
    });

    test('should create new board', (done) => {
      const nonExistingLifeCycleId = '555544515115212424';
      const fakeBoard = {};
      const BoardMock = sinon.mock(Board);
      const LifecycleMock = sinon.mock(Lifecycle);
      LifecycleMock.expects('insertMany').resolves({
        name: 'create a monorepo',
        _id: nonExistingLifeCycleId,
      });
      BoardMock.expects('create')
        .withArgs(fakeBoard)
        .resolves(fakeBoard);

      request(server)
        .patch('/boards')
        .send(fakeBoard)
        .expect(OK)
        .end(() => {
          BoardMock.restore();
          LifecycleMock.restore();
          return done();
        });
    });
  });

  describe('URL/boards/kanban', () => {
    test('should return 400 if no boardid is sent', (done) => {
      request(server)
        .get('/boards/kanban')
        .expect(BAD_REQUEST, done);
    });

    test('should return 400 if boardid is not valid', (done) => {
      request(server)
        .get('/boards/kanban?boardid=abcd')
        .expect(BAD_REQUEST, done);
    });

    test('should return 200 if boardid is valid', (done) => {
      request(server)
        .get('/boards/kanban?boardid=5cfaf71c26607358e66c1d46')
        .expect(OK, done);
    });
  });
});
