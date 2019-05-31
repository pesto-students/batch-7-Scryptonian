import request from 'supertest';
import server from './boards';

describe('Testing if server is running', () => {
  it('responds with 200 status', () => {
    request(server)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
      });
  });
});
