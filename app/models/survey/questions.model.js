module.exports = (sequelize, Sequelize) => {
  const SurveyQuestions = sequelize.define("pertanyaan_survey", {
      id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      Question: {
          type: Sequelize.STRING
      }
  });
  return SurveyQuestions;
};