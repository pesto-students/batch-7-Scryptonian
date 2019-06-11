import request from 'supertest';
import { server, db } from '../index';
import { BAD_REQUEST, OK } from '../configs/httpStatusCodes';

server.close();
describe('URL/issues routes', () => {
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
      request(server)
        .post('/issues')
        .send({ lifecycleid: '123456789abc', issue: 'A new issue', createdBy: '1234567890ab' })
        .expect(OK, done);
    });
  });
});
