const Routes = require('../../../src/routes');
const Server = require('../../../server');

describe('Testing the route that returns the list of questions for a particular user ID', () => {
  test('Should contain correct number of routes at server and routes file', () => {
    expect(Routes.length).toBe(Server.table('localhost')[0].table.length);
  });
  test('Should return 200 status code for sucessful GET request', (done) => {
    const request = {
      method: 'GET',
      url: '/',
    };
    Server.inject(request, (response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  test('Should create a new user and return all questions with options', (done) => {
    const request = {
      method: 'GET',
      url: '/questions/mahesh',
    };
    Server.inject(request, (response) => {
      expect(response.data).toEqual(false);
      done();
    });
  });
});
