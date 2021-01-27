module.exports = (sequelize, Sequelize) => {
    const PicUKM = sequelize.define("state_pic_ukm", {
        nim: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        state_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });
    return PicUKM;
};