module.exports = (sequelize, Sequelize) => {
    const ErrorLogs = sequelize.define("error_logs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      error_code: {
        type: Sequelize.INTEGER
      },
      section: {
          type: Sequelize.STRING
      },
      subsection: {
          type: Sequelize.STRING
      },
      function: {
          type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      }
    });
  
    return ErrorLogs;
  };