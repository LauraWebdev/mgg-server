const { Sequelize } = require('sequelize');
const chalk = require('chalk');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false
});

const UserModel = require('./models/user');
const UserRoleModel = require('./models/userRole');
const GameModel = require('./models/game');
const GameScreenshotModel = require('./models/gameScreenshot');

const User = UserModel(sequelize, Sequelize);
const UserRole = UserRoleModel(sequelize, Sequelize);
const Game = GameModel(sequelize, Sequelize);
const GameScreenshot = GameScreenshotModel(sequelize, Sequelize);

const ROLES = ["user", "supporter", "moderator", "admin"];

User.hasMany(Game, { as: "games" });
Game.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

User.belongsToMany(UserRole, {
    through: "user_roles",
    as: "roles",
    foreignKey: "user_id",
});
UserRole.belongsToMany(User, {
    through: "user_Roles",
    as: "users",
    foreignKey: "role_id",
});

Game.hasMany(GameScreenshot, { as: "screenshots" });
GameScreenshot.belongsTo(Game, {
    foreignKey: "gameId",
    as: "game"
});

function createRoles() {
    UserRole.create({
        id: 1,
        name: "user"
    });
    UserRole.create({
        id: 2,
        name: "supporter"
    });
    UserRole.create({
        id: 3,
        name: "moderator"
    });
    UserRole.create({
        id: 4,
        name: "admin"
    });
}

sequelize.sync({force: true}).then(() => {
    console.log(chalk.grey('Sequelize updated database.'));
    createRoles();
});

module.exports = {
    User,
    UserRole,
    Game,
    GameScreenshot,
    ROLES
};