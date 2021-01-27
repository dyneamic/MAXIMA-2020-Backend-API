module.exports = (sequelize, Sequelize) => {
    const KegiatanState = sequelize.define("state_activities", {
        state_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        day: {
            type: Sequelize.INTEGER
        },
        room: {
            type: Sequelize.STRING
        },
        duration: {
            type: Sequelize.FLOAT
        },
        quota: {
            type: Sequelize.INTEGER
        },
        registered: {
            type: Sequelize.INTEGER
        },
        kategori: {
            type: Sequelize.STRING
        },
        link_logo: {
            type: Sequelize.STRING
        },
        kode_presensi: {
            type: Sequelize.STRING
        }
    });
    return KegiatanState;
};