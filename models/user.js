module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        avatarFileName: type.STRING,
        pronouns: type.STRING,
        ingameID: type.STRING,
        socialDiscord: type.STRING,
        socialTwitter: type.STRING,
        socialYouTube: type.STRING,
        banActive: type.BOOLEAN,
        banReason: type.STRING,
        loginDiscord: type.STRING,
        loginTwitter: type.STRING,
        loginGoogle: type.STRING,
    });
}