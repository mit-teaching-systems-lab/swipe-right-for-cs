const httpMocks = require('node-mocks-http');
const {loginEndpoint} = require('./authentication');
const {sendEmail} = require('./util/email.js');
const EventEmitter = require('events');

function createTestResponse() {
	var testResponse = httpMocks.createResponse({
		eventEmitter: EventEmitter
	});
	// testResponse.statusCode = null;
	return testResponse;
}

describe('loginEndpoint', () => {
  it('returns 405 when user is not in whitelist', (done) => {
  	// mock request and response
    const request  = httpMocks.createRequest({
      method: 'POST',
      url: '/login',
      body: {
      	email : 'keving17@mit.edu',
      	pass : 'passwords'
      }
    });
    const response = createTestResponse();


    // mock dependencies
    const pool = {
    	query: jest.fn(() => Promise.resolve({rowCount: 0}))
    // 		if ((values[0] === 'keving17@mit.edu') && (values[1] === 'password')){
				// console.log('should log 200');
				// return Promise.resolve({rowCount: 1});
    // 		}
 			// else {
 			// 	console.log('should log 405');
				// return Promise.resolve({rowCount: 0});		
 			// } 
    };
    const mailgunEnv = {};

    // mock sendEmail
    console.log('test - mocking sendEmail');
    // jest.mock('./util/email.js');
    // const emails = require('./util/email.js');
    // emails.sendEmail = jest.fn(cb => cb(null, { status: 'sent!' }));

    
    console.log('test - mocking endpoint call');
    console.log('test - initial res',response.statusCode);

    loginEndpoint(pool, mailgunEnv, request, response);
    console.log('test - after loginEndpoint');

    // setTimeout(() => {
    // 	console.log('test - should be in here!');
    // 	expect(true).toEqual(false);
    // 	// expect(response.statusCode).toBe(405);
    // 	// done();
    //    // expect(emails.sendEmail).toHaveBeenCalledWith(['keving17@mit.edu'])
    //    done();
    // }, 1000);

    response.on('end', () => {
    	console.log('test - end');
    	done();
    });

    response.on('error', () => {
    	console.log('test - error');
    	done();
    });
  });
});