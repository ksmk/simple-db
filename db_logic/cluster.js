'use strict';

require('dotenv').config()

const cluster = require('cluster');
const workers = process.env.WORKERS || require('os').cpus().length;




let spinCluster = (function() {
  cluster.setupMaster({ 
    exec: __dirname + '/second.js'
  });
  if(cluster.isMaster) {
    for (let i = 0; i < workers; i++) {
      let worker = cluster.fork();
    }
  } 
  return
})();






// const Sequelize = require('sequelize');
// const sequelize = new Sequelize( 
//   // process.env.DB_NAME, 
//   process.env.DB_TEST, 
//   process.env.DB_USER, 
//   process.env.DB_PASS,
//   // opts-object 
//   {
//     host:    process.env.DB_HOST,
//     dialect: 'postgres',
//     operatorsAliases: false,
//     pool:   { max: process.env.WORKERS || 12, min: 3, acquire: 30000, idle: 10000 },
//     define: { timestamps: false, freezeTableName: true },
//     logging: false
//   });



// exception handling ???
