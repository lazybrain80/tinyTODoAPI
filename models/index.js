"use strict";

const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
var db = {};

var sequelize = new Sequelize(
  __config.maria.db,
  __config.maria.usr,
  __config.maria.pwd,
  {
    host: __config.maria.host,
    port: __config.maria.port,
    dialect: "mariadb",
    define: { freezeTableName: true },
    logging: false,
    timezone: "+09:00",
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const models = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );

    models.forEach((model) => {
      db[model.name] = model;
    });
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
