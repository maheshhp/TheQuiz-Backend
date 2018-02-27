const Server = require('../../../server');
const Models = require('../../../models');

beforeAll((done) => {
  Models.user_answer.create({
    user_id: 1,
    question_id: 10,
    option: 'India',
  }).then(() => {
    done();
  });
});

afterAll((done) => {
  Models.user_answer.destroy({
    truncate: true,
  }).then(() => {
    done();
  });
});

describe('Testing the route that updates the option for a particular users question', () => {
  test('Should update existing value and return the new value', (done) => {
    const request = {
      method: 'POST',
      url: '/update',
      payload: {
        user_id: 1,
        question_id: 10,
        option: 'Oz',
      },
    };
    Server.inject(request, (response) => {
      expect(response).toBe(false);
      done();
    });
  });
});
