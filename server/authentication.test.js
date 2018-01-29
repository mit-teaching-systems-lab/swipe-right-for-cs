const httpMocks = require('node-mocks-http');
const {loginEndpoint} = require('./authentication');
const {testResponse, testPool, resetTestDatabase} = require('./util/testHelpers.js');

beforeEach(resetTestDatabase);

describe('loginEndpoint', () => {
  it('returns 200 when user is not in whitelist but log attempt (to not reveal this information to client)', done => {
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
    jest.spyOn(global.console, 'log');

    loginEndpoint(pool, mailgunEnv, request, response);
    response.on('end', () => {
      expect(response.statusCode).toEqual(200);
      expect(console.log).toBeCalledWith('Unauthorized access attempted by email: ', 'fakekevin@mit.edu');
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
    jest.spyOn(global.console, 'log');
    
    loginEndpoint(pool, mailgunEnv, request, response);
    response.on('end', () => {
      expect(response.statusCode).toEqual(200);
      expect(console.log).not.toBeCalledWith('Unauthorized access attempted by email: ', 'kevin@mit.edu');
      pool.end(done);
    });
  });
});