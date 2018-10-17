'use strict';

require('dotenv').config()
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';

const db        = {};
const config    = {};
config.database = process.env.DB_NAME;
config.username = process.env.DB_USER;
config.password = process.env.DB_PASS;

const opts = {
  host:    process.env.DB_HOST,
  dialect: 'postgres',
  operatorsAliases: false,
  pool:   { max: process.env.WORKERS || 12, min: 3, acquire: 30000, idle: 10000 },
  define: { timestamps: false, freezeTableName: true },
  logging: false
}

const sequelize = new Sequelize(config.database, config.username, config.password, opts);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
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
