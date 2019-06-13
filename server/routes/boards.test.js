import request from 'supertest';
import { server, db } from '../index';

import { BAD_REQUEST, OK } from '../configs/httpStatusCodes';

describe('URL/boards/', () => {
  beforeAll(() => {
    server.close();
  });

  afterAll(() => {
    db.close();
    server.close();
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
