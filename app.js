'use strict';

require('dotenv').config()
const cluster = require('cluster');
const workers = process.env.WORKERS || require('os').cpus().length;
const express = require('express');
const app = express();

const models = require('./models');
const sequelize = models.sequelize;


(function main() {
  if(cluster.isMaster) {    
    master()
  } else {
    worker()
  }
})();


function master() {
  // spin workers
  for (let i = 0; i < workers; ++i) {
    let worker = cluster.fork();
  }

  // careful here Icarus!
  switch( process.env.NODE_ENV ) {
    case 'dev':
      console.log('running in the development mode, database sync ON')
      sequelize.sync( {force: true} )
      break;
    case 'stg':
      console.log('running in the staging mode, fdatabase sync ON')  
      sequelize.sync( {force: true} )
      break;
    case 'prd':      
      console.log('running in the production mode, database sync OFF')
      break;
    default:
      console.log('running in the unknown mode, database sync OFF')
  }
} 


function worker() {
  // const fs        = require('fs');
  // const access = fs.createWriteStream('app.log', { flags: 'a' });
  // process.stdout.pipe(access);

  process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
  })
  
  // connection test
  sequelize.authenticate()
    .then(() => {
      console.log('db connection has been established successfully'); 
    })
    .catch(err => {
      console.error('unable to connect to the database:', err);
    });

    
  const port = process.env.PORT || 3000;
  app.listen(port, () => {    
    console.log('node instance: ' + cluster.worker.id + ' ready for requests on http://localhost:' + port);
  });
  
  
  const bodyParser = require('body-parser');
  const cors = require('cors');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  // const path = require('path');
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'pug');



  // router.get('/customers', (req, res) => { 
  //   return models.customers.findAll( {limit: 12} )
  //     .then(( res ) => res.send( res ) )    
  //     .catch((err) => {
  //       console.log('***There was an error querying customers', JSON.stringify(err))
  //     return res.status(400).send(err)
  //   })
  // })  
  // app.use('/', router);
  

  const finale = require('finale-rest')
  const forbiddenRes = require('finale-rest').Errors.ForbiddenError;

  finale.initialize({
    app: app,
    sequelize: sequelize
  });

  const customersRes = finale.resource({
    model: models.customers,
    endpoints: ['/api/customers', '/api/customers/:object_id']
  })
  
  const ordersRes = finale.resource({
    model: models.orders,
    endpoints: ['/api/orders', '/api/orders/:object_id']
  })
  
  //
  customersRes.delete.auth( (req, res, ctx) => {
    return ctx.error(403, "forbidden operation");    
  })

  ordersRes.delete.auth( (req, res, ctx) => {
    return ctx.error(403, "forbidden operation");    
  })


  
  const employeesRes = finale.resource({
    model: models.employees,
    endpoints: ['/api/employees', '/api/employees/:object_id']
  })

  const productsRes = finale.resource({
    model: models.products,
    endpoints: ['/api/products', '/api/products/:object_id']
  })

  const categoriesRes = finale.resource({
    model: models.categories,
    endpoints: ['/api/categories', '/api/categories/:object_id']
  })

  const shippersRes = finale.resource({
    model: models.shippers,
    endpoints: ['/api/shippers', '/api/shippers/:object_id']
  })

  const suppliersRes = finale.resource({
    model: models.suppliers,
    endpoints: ['/api/suppliers', '/api/suppliers/:object_id']
  })

  // app.get('/customers', (req, res) => {    
  //   return models.customers.findAll( {limit: process.env.QUERIES} )
  //     .then(( x ) => { 
  //       console.log('\n***Fetch all customers')
  //       console.log( req.headers )
  //       res.send( x )        
  //     }) 
  //     .catch((err) => {
  //       console.log('\n***There was an error querying customers', JSON.stringify(err))
  //       return res.status(400).send(err)
  //     })
  // })

  // app.get('/orders', (req, res) => {    
  //   return models.orders.findAll( {limit: process.env.QUERIES} )
  //     .then(( x ) => { 
  //       console.log('\n***Fetch all orders')
  //       console.log( req.headers )
  //       res.send( x )        
  //     }) 
  //     .catch((err) => {
  //       console.log('\n***There was an error querying orders', JSON.stringify(err))
  //       return res.status(400).send(err)
  //     })
  // })
  

  // // and so on 

  // external_API
  // CRUD: 
  // customers, orders +order_details,   

  // internal_API
  // CRUD:
  // employees, products, categories, suppliers, shippers

}
















// const Sequelize = require('sequelize');
// const sequelize = new Sequelize( 
//   process.env.DB_NAME, 
//   process.env.DB_USER, 
//   process.env.DB_PASS,  
//   {
//     host:    process.env.DB_HOST,
//     dialect: 'postgres',
//     operatorsAliases: false,
//     pool:   { max: workers || 12, min: 3, acquire: 30000, idle: 10000 },
//     define: { timestamps: false, freezeTableName: true },
//     logging: false
//   }
// );






























