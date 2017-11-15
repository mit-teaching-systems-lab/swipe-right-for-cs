const httpMocks = require('node-mocks-http');
const {loginEndpoint} = require('./authentication');

describe('loginEndpoint', () => {
  it('works', () => {
    const request  = httpMocks.createRequest({
      method: 'GET',
      url: '/login'
    });
    const response = httpMocks.createResponse();
    loginEndpoint(request, response);
    expect(response.statusCode).toEqual(405);
  });
});