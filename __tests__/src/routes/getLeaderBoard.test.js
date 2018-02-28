const Server = require('../../../server');
const Models = require('../../../models');

beforeAll((done) => {
  const tempCreateArray = [];
  for (let i = 0; i < 10; i += 1) {
    tempCreateArray.push({
      user_name: `User${i}`,
      score: i,
    });
  }
  Models.users.bulkCreate(tempCreateArray).then(() => {
    done();
  });
});

afterAll((done) => {
  Models.users.destroy({
    truncate: true,
  }).then(() => {
    done();
  });
});

describe('Testing the route that gets the top 5 entries by score', () => {
  test('Should return 5 records in the user table', (done) => {
    const request = {
      method: 'GET',
      url: '/leaderBoard',
    };
    Server.inject(request, (response) => {
      expect(JSON.parse(response.payload).data.length).toBe(5);
      done();
    });
  });
});
