module.exports = (sequelize, Sequelize) => {
    const PasswordReset = sequelize.define("users_password_reset", {
        nim: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        otp: {
            type: Sequelize.STRING
        },
        expired: {
            type: Sequelize.INTEGER
        }
    });
    return PasswordReset;
};