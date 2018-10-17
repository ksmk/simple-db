'use strict';

require('dotenv').config()
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';

// var config    = require(__dirname + '/../config/config.js')[env];
// var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }


var db        = {};
var config    = {};
config.database = process.env.DB_NAME;
config.username = process.env.DB_USER;
config.password = process.env.DB_PASS;

var opts = {
  host:    process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false,
  pool:   { max: process.env.WORKERS || 12, min: 3, acquire: 30000, idle: 10000 },
  define: { timestamps: false, freezeTableName: true },
  logging: false
}

var sequelize = new Sequelize(config.database, config.username, config.password, opts);
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
