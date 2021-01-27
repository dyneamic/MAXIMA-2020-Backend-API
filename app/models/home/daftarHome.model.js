module.exports = (sequelize, Sequelize) => {
    const DaftarHome = sequelize.define("home_information", {
        home_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        search_key: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        kategori: {
            type: Sequelize.STRING
        },
        narasi: {
            type: Sequelize.STRING,
        },
        narasi_panjang: {
            type: Sequelize.STRING(1500)
        },
        link_logo: {
            type: Sequelize.STRING
        },
        link_video: {
            type: Sequelize.STRING
        },
        link_audio: {
            type: Sequelize.STRING
        },
        line: {
            type: Sequelize.STRING
        },
        instagram: {
            type: Sequelize.STRING
        }
    });
    return DaftarHome;
};