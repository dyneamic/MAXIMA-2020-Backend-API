module.exports = (sequelize, Sequelize) => {
  const SurveyResponse = sequelize.define("respon_survey", {
      nim: {
          type: Sequelize.INTEGER,
          primaryKey: true
      },
      nama_lengkap: {
          type: Sequelize.STRING
      },
      jurusan: {
          type: Sequelize.STRING
      },
      state_name: {
          type: Sequelize.STRING
      },
      state_id: {
          type: Sequelize.INTEGER
      },
      section1_1: {
          type: Sequelize.INTEGER
      },
      section1_2: {
          type: Sequelize.STRING
      },
      section2_1: {
          type: Sequelize.INTEGER
      },
      section2_2: {
          type: Sequelize.INTEGER
      },
      section2_3: {
          type: Sequelize.INTEGER
      },
      section2_4: {
          type: Sequelize.INTEGER
      },
      section2_5: {
          type: Sequelize.INTEGER
      },
      section3_1: {
          type: Sequelize.STRING
      },
      section3_2: {
          type: Sequelize.STRING
      }
  });
  return SurveyResponse;
};