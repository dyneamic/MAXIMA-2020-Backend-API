module.exports = (sequelize, Sequelize) => {
    const PresensiState = sequelize.define("state_attendance", {
        nim: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        state_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        attendance: {
            type: Sequelize.INTEGER
        }
    });
    return PresensiState;
};