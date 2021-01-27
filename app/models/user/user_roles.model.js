module.exports = (sequelize, Sequelize) => {
    const UserRoles = sequelize.define("user_role", {
      nim: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  
    return UserRoles;
  };