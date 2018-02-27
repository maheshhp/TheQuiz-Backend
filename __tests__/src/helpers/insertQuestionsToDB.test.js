const insertQuestionsToDB = require('../../../src/helpers/insertQuestionsToDB');
const Models = require('../../../models');

beforeAll((done) => {
  insertQuestionsToDB((value) => {
    if (value === 'done') {
      done();
    }
  });
});

afterAll((done) => {
  Models.questions.destroy({
    truncate: true,
  }).then(() => {
    Models.question_option.destroy({
      truncate: true,
    }).then(() => {
      done();
    });
  });
});

describe('Testing the helper function that populates the DB from external API', () => {
  test('Questions table should contain 12 questions', (done) => {
    Models.questions.count().then((count) => {
      expect(count).toBe(12);
      done();
    });
  });
  test('Question-Option table should contain 48 entries', (done) => {
    Models.question_option.count().then((count) => {
      expect(count).toBe(48);
      done();
    });
  });
});
