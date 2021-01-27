module.exports = (sequelize, Sequelize) => {
    const Technical = sequelize.define("technical", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      message: {
        type: Sequelize.STRING
      }
    });
  
    return Technical;
  };