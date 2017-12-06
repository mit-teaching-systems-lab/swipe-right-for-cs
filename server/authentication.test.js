const httpMocks = require('node-mocks-http');
const {loginEndpoint} = require('./authentication');
const {testResponse, testPool, resetTestDatabase} = require('./util/testHelpers.js');

beforeEach(resetTestDatabase);

describe('loginEndpoint', () => {
  it('returns 405 when user is not in whitelist', done => {
    const request  = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        email : 'fakekevin@mit.edu'
      }
    });
    const response = testResponse();
    const pool = testPool();
    const mailgunEnv = {};

    loginEndpoint(pool, mailgunEnv, request, response);
    response.on('end', () => {
      expect(response.statusCode).toEqual(405);
      pool.end(done);
    });
  });

  it('returns 200 when user is in whitelist', done => {
    const request  = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
        email : 'kevin@mit.edu'
      }
    });
    const response = testResponse();
    const pool = testPool();
    const mailgunEnv = {};

    loginEndpoint(pool, mailgunEnv, request, response);
    response.on('end', () => {
      expect(response.statusCode).toEqual(200);
      pool.end(done);
    });
  });
});