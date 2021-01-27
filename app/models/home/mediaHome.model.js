module.exports = (sequelize, Sequelize) => {
    const MediaHome = sequelize.define("home_media", {
        media_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        home_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        link_media: {
            type: Sequelize.STRING
        }
    });
    return MediaHome;
};