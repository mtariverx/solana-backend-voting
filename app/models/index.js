const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const fs = require('fs');
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorAliases: false,
//     port: dbConfig.port,
//     sslmode: 'require',
//     ssl:{
//         rejectUnauthorized: true,
//         ca: fs.readFileSync("../config/ca_certificate.cer").toString()
//     }
// });
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idel
    }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
db.Voter = require("./voter.model.js")(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
module.exports = db