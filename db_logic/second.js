'use strict';

require('dotenv').config()
const cluster = require('cluster');
const workers = process.env.WORKERS || require('os').cpus().length;
const express = require('express');
const app = express();

const Sequelize = require('sequelize');
const sequelize = new Sequelize( 
  process.env.DB_NAME, 
  // process.env.DB_TEST, 
  process.env.DB_USER, 
  process.env.DB_PASS,
  // opts-object 
  {
    host:    process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
    pool:   { max: workers || 12, min: 3, acquire: 30000, idle: 10000 },
    define: { timestamps: false, freezeTableName: true },
    logging: false
  });


var models = require('../models');

  // var models = require('./models');
  // const db = {};
  // db.Sequelize = Sequelize;  
  // db.sequelize = sequelize;
  // db.categories = require('./models/categories.js')(sequelize, Sequelize);

// const CategoriesX = require('./models');
// const CategoriesX = require('db');
  
  // var models = require('./models/orders');
// var db = require('./models/Categories')
  // var Promise = require('bluebird')
  // var unhandledPromises = [];
  // Promise.onPossiblyUnhandledRejection(function(reason, promise) {
  //     unhandledPromises.push(promise);
  //     //Update some debugger UI
  // });  
  // Promise.onUnhandledRejectionHandled(function(promise) {
  //     var index = unhandledPromises.indexOf(promise);
  //     unhandledPromises.splice(index, 1);
  //     //Update the debugger UI
  // });

  process.on('unhandledRejection', function (reason, promise) {
    console.error('Unhandled rejection', {reason: reason, promise: promise})
  });


function workerCode() {
  // connection test
  sequelize.authenticate()
    .then(() => {
      console.log('db connection has been established successfully');
    })
    .catch(err => {
      console.error('unable to connect to the database:', err);
    });

  process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
  })

  const port = process.env.PORT || 3000;
  app.listen(port, () => {    
    console.log('node instance: ' + cluster.worker.id + ' ready for requests on http://localhost:' + port);
  });

  const bodyParser = require('body-parser');
  const jsonParser = bodyParser.json();
  app.use(jsonParser)

  const cors = require('cors');
  app.use(cors());








  // skladanie zamowien, CRUD na pracownikach i CRUD na dostawcach
  // CRUD na kategoriach i pytanie co z klientami
  // to w sumie zalezy juz jak bardzo chcemy miec to rozwiniete
  // tam tez moze byc CRUD
  // plus CRUD na produktach i spedytorach



  // external_API
  // CRUD: 
  // customers, orders +order_details,   
  app.post('/customers/v1', (req, res) => {
    const { customer_id, company_name } = req.body
    // return Customers.create( {customer_id, company_name} )
    
    // const { company_name } = req.body
    // let str = company_name
    // str = str.replace(/[^a-zA-Z ]/g, "")
    // let customer_id = 'XXXX21'

    // customer_id = customer_id.toLowerCase()
    // console.log( str )
    // console.log( customer_id )
    return Customers.create( { customer_id , company_name} )
      .then((customer) => res.send(customer) )      
      .catch((err) => {
        console.log('***There was an error creating a customer', JSON.stringify(customer))
        return res.status(400).send(err)
      })
  })


  // transactions ?
  app.post('/customers/v2', (req, res) => {
    const { customer_id, company_name } = req.body
    return sequelize.transaction(function (t) {
      return Customers.create( {customer_id, company_name}, {transaction: t} )
        .then((customer) => res.send(customer) )        
        .catch((err) => {
          console.log('***There was an error creating a customer', JSON.stringify(customer))
          throw new Error()
          return res.status(400).send(err) 
        })
      })    
  })





  app.post('/customers/v3', (req, res) => {
    const { customer_id, company_name } = req.body
 
    // const { company_name } = req.body
    // let str = company_name
    // str = str.replace(/[^a-zA-Z ]/g, "")
    // let customer_id = 'XXXX21'
    // customer_id = customer_id.toLowerCase()

    // console.log( str )
    // console.log( customer_id )
    return Customers.create( { customer_id , company_name} )
      .then((customer) => res.send(customer) )      
      .catch((err) => {
        console.log('***There was an error creating a customer', JSON.stringify(customer))
        return res.status(400).send(err)
      })
  })




  app.put('/customers', (req, res) => {   

  })

  app.get('/customers/:id', (req, res) => {    
    return Customers.findAll( {limit: 1} )
      .then((customer) => res.send(customer) )    
      .catch((err) => {
        console.log('***There was an error querying customers', JSON.stringify(err))
        return res.status(400).send(err)
      })
  })

  app.get('/customers', (req, res) => {    
    return Customers.findAll( {limit: 11} )
      .then((customer) => res.send(customer) )    
      .catch((err) => {
        console.log('***There was an error querying customers', JSON.stringify(err))
        return res.status(400).send(err)
      })
  })

  app.put('/customers/update', (req, res) => {   

  })

  app.patch('/customers/update', (req, res) => {   

  })
  
  app.delete('/customers/delete', (req, res) => {   

  })


  // internal_API
  // CRUD:
  // employees, products, categories, suppliers, shippers


}



const Customers = sequelize.define( 'customers', {
  customer_id: { type: Sequelize.STRING(15), unique: true, allowNull: false, primaryKey: true }, //bpchar
  company_name: { type: Sequelize.STRING(40), unique: true, allowNull: false },
  contact_name: Sequelize.STRING(30),
  contact_title: Sequelize.STRING(30),
  address: Sequelize.STRING(60),
  city: Sequelize.STRING(15),
  region: Sequelize.STRING(15),
  postal_code: Sequelize.STRING(10),
  country: Sequelize.STRING(15),
  phone: Sequelize.STRING(24),
  fax: Sequelize.STRING(24)
    
  ,object_id: { type: Sequelize.UUID, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_generate_v4()') }  
})



;(function mainCode() {
  // dropCreateDB()
  // upModels()
  // models.Categories.findAll();

  
  // models.categories.findAll( {limit: 5} ).then( customers => { console.log(JSON.stringify(customers)) } ) ;
  // upCustomers();
  
  if(cluster.isMaster) {    
    masterCode()
  } else {
    workerCode()
  }
})();

function masterCode() {
  // sequelize.sync();
  models.customers.findAll( {limit: 5} ).then( res => { console.log(JSON.stringify( res )) } ) 
  models.categories.findAll( ).then( res => { console.log(JSON.stringify( res )) } ) 
  // spin workers  
  // Customers.findAll( {limit: 5} ).then( customers => { console.log(JSON.stringify(customers)) } ) ;

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
      console.log('running in the staging mode, database sync ON')  
      sequelize.sync( {force: true} )
      break;
    case 'prd':
      console.log('running in the production mode, database sync OFF')
      break;
    default:
      console.log('running in the unknown mode, database sync OFF')
  }
} 






function upCustomers() {
  const Customers = sequelize.define( 'customers', {
    customer_id: { type: Sequelize.STRING(15), unique: true, allowNull: false, primaryKey: true }, //bpchar
    company_name: { type: Sequelize.STRING(40), unique: true, allowNull: false },
    contact_name: Sequelize.STRING(30),
    contact_title: Sequelize.STRING(30),
    address: Sequelize.STRING(60),
    city: Sequelize.STRING(15),
    region: Sequelize.STRING(15),
    postal_code: Sequelize.STRING(10),
    country: Sequelize.STRING(15),
    phone: Sequelize.STRING(24),
    fax: Sequelize.STRING(24)
      
    ,object_id: { type: Sequelize.UUID, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_generate_v4()') }  
  })
}




















function upModels() {

  // n:m def. under Employees 
  const EmployeeTerritories = sequelize.define( 'employee_territories', {
    employee_id:  { type: Sequelize.SMALLINT, allowNull: false },   //fk 
    territory_id: { type: Sequelize.STRING(20), allowNull: false }  //fk
  })
  function up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('ALTER TABLE "employee_territories" ADD CONSTRAINT "employee_territories_pkey" PRIMARY KEY ("employee_id", "territory_id")');
  };
  // up();
  // employee_id smallint NOT NULL,
  // territory_id character varying(20) NOT NULL,
  // CONSTRAINT pk_employee_territories PRIMARY KEY (employee_id, territory_id),
  // CONSTRAINT fk_employee_territories_employees FOREIGN KEY (employee_id)
  //     REFERENCES public.employees (employee_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION,
  // CONSTRAINT fk_employee_territories_territories FOREIGN KEY (territory_id)
  //     REFERENCES public.territories (territory_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION
  
  // what really sequelize gives here:
  // CONSTRAINT employee_territories_pkey PRIMARY KEY (employee_id),
  // CONSTRAINT employee_territories_employee_id_fkey FOREIGN KEY (employee_id)
  //     REFERENCES public.employees (employee_id) MATCH SIMPLE
  //     ON UPDATE CASCADE ON DELETE CASCADE,
  // CONSTRAINT employee_territories_territory_id_fkey FOREIGN KEY (territory_id)
  //     REFERENCES public.territories (id) MATCH SIMPLE
  //     ON UPDATE CASCADE ON DELETE CASCADE,
  // CONSTRAINT employee_territories_employee_id_territory_id_key UNIQUE (employee_id, territory_id)
  
  
  // n:m def. under Customers
  const CustomerDemo = sequelize.define( 'customer_customer_demo', {
    customer_id:      { type: Sequelize.STRING(15), allowNull: false }, //bpchar
    customer_type_id: { type: Sequelize.STRING(15), allowNull: false }  //bpchar 
  })
  // customer_id bpchar NOT NULL,
  // customer_type_id bpchar NOT NULL,
  // CONSTRAINT pk_customer_customer_demo PRIMARY KEY (customer_id, customer_type_id),
  // CONSTRAINT fk_customer_customer_demo_customer_demographics FOREIGN KEY (customer_type_id)
  //     REFERENCES public.customer_demographics (customer_type_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION,
  // CONSTRAINT fk_customer_customer_demo_customers FOREIGN KEY (customer_id)
  //     REFERENCES public.customers (customer_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION
  
  
  
  
  
  
  
  const CustomerDemographics = sequelize.define( 'customer_demographics', {
    customer_type_id: { type: Sequelize.STRING(15), unique: true, allowNull: false, primaryKey: true }, //bpchar
    customer_desc: Sequelize.TEXT
  })
  // customer_type_id bpchar NOT NULL,
  // customer_desc text,
  // CONSTRAINT pk_customer_demographics PRIMARY KEY (customer_type_id)
  
  
  
  // OPTIONAL table not present in the original Northwind database
  const States = sequelize.define( 'us_states', {
    state_id:  { type: Sequelize.SMALLINT, allowNull: false, primaryKey: true },   
    state_name: Sequelize.STRING(100),
    state_abbr: Sequelize.STRING(2),
    state_region: Sequelize.STRING(50)
  })
  // state_id smallint NOT NULL,
  // state_name character varying(100),
  // state_abbr character varying(2),
  // state_region character varying(50),
  // CONSTRAINT pk_usstates PRIMARY KEY (state_id)
  
  const Territories = sequelize.define( 'territories', {
    territory_id:          { type: Sequelize.STRING(20), allowNull: false, primaryKey: true },  //fk
    territory_description: { type: Sequelize.STRING(15), allowNull: false },  //bpchar 
    region_id:             { type: Sequelize.SMALLINT, allowNull: false }     //fk 
  })
  // Territories.hasMany(EmployeeTerritories, {foreignKey: 'territory_id'})
  // territory_id character varying(20) NOT NULL,
  // territory_description bpchar NOT NULL,
  // region_id smallint NOT NULL,
  // CONSTRAINT pk_territories PRIMARY KEY (territory_id),
  // CONSTRAINT fk_territories_region FOREIGN KEY (region_id)
  //     REFERENCES public.region (region_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION
  
  const Region = sequelize.define( 'region', {  
    region_id:          { type: Sequelize.SMALLINT, unique: true, allowNull: false, primaryKey: true },
    region_description: { type: Sequelize.STRING(15), allowNull: false } //bpchar
  })
  Region.hasMany(Territories, {foreignKey: 'region_id'})
  // region_id smallint NOT NULL,
  // region_description bpchar NOT NULL,
  // CONSTRAINT pk_region PRIMARY KEY (region_id)
  
  
  const Suppliers = sequelize.define( 'suppliers', {  
    supplier_id:  { type: Sequelize.SMALLINT, unique: true, allowNull: false, primaryKey: true, 
      defaultValue: function() {
        return generateSupplierId()
    } },
    company_name: { type: Sequelize.STRING(40), allowNull: false },
    contact_name: Sequelize.STRING(30),
    contact_title: Sequelize.STRING(30),
    address: Sequelize.STRING(60),
    city: Sequelize.STRING(15),
    region: Sequelize.STRING(15),
    postal_code: Sequelize.STRING(10),
    country: Sequelize.STRING(15),
    phone: Sequelize.STRING(24),
    fax: Sequelize.STRING(24),
    homepage: Sequelize.TEXT
  })
  
  function generateSupplierId() {
  
  }
  
  // supplier_id smallint NOT NULL,
  // company_name character varying(40) NOT NULL,
  // contact_name character varying(30),
  // contact_title character varying(30),
  // address character varying(60),
  // city character varying(15),
  // region character varying(15),
  // postal_code character varying(10),
  // country character varying(15),
  // phone character varying(24),
  // fax character varying(24),
  // homepage text,
  // CONSTRAINT pk_suppliers PRIMARY KEY (supplier_id)
  
  const Shippers = sequelize.define( 'shippers', {  
    shipper_id: { type: Sequelize.SMALLINT, unique: true, allowNull: false, primaryKey: true },
    company_name: { type: Sequelize.STRING(40), allowNull: false },
    phone: Sequelize.STRING(24)
  })
  // shipper_id smallint NOT NULL,
  // company_name character varying(40) NOT NULL,
  // phone character varying(24),
  // CONSTRAINT pk_shippers PRIMARY KEY (shipper_id)
  
  const Categories = sequelize.define( 'categories', {
    category_id: { type: Sequelize.SMALLINT, unique: true, allowNull: false, primaryKey: true }, 
    category_name: { type: Sequelize.STRING(15), allowNull: false }, 
    description: Sequelize.TEXT,
    picture: Sequelize.BLOB //bytea binary data type
  })
  // category_id smallint NOT NULL,
  // category_name character varying(15) NOT NULL,
  // description text,
  // picture bytea,
  // CONSTRAINT pk_categories PRIMARY KEY (category_id)
  
  const Customers = sequelize.define( 'customers', {
    customer_id: { type: Sequelize.STRING(15), unique: true, allowNull: false, primaryKey: true }, //bpchar
    company_name: { type: Sequelize.STRING(40), unique: true, allowNull: false },
    contact_name: Sequelize.STRING(30),
    contact_title: Sequelize.STRING(30),
    address: Sequelize.STRING(60),
    city: Sequelize.STRING(15),
    region: Sequelize.STRING(15),
    postal_code: Sequelize.STRING(10),
    country: Sequelize.STRING(15),
    phone: Sequelize.STRING(24),
    fax: Sequelize.STRING(24)
      
    ,uuid: { type: Sequelize.UUID, unique: true, allowNull: false, defaultValue: Sequelize.literal('uuid_generate_v4()') }  
  })
  Customers.belongsToMany(CustomerDemographics, {through: CustomerDemo, foreignKey: 'customer_id'})
  CustomerDemographics.belongsToMany(Customers, {through: CustomerDemo, foreignKey: 'customer_type_id'})
  // customer_id bpchar NOT NULL,
  // company_name character varying(40) NOT NULL,
  // contact_name character varying(30),
  // contact_title character varying(30),
  // address character varying(60),
  // city character varying(15),
  // region character varying(15),
  // postal_code character varying(10),
  // country character varying(15),
  // phone character varying(24),
  // fax character varying(24),
  // CONSTRAINT pk_customers PRIMARY KEY (customer_id)
  
  const Employees = sequelize.define( 'employees', {
    employee_id: { type: Sequelize.SMALLINT, unique: true, allowNull: false, primaryKey: true }, 
    last_name: { type: Sequelize.STRING(20), allowNull: false },
    first_name: { type: Sequelize.STRING(10), allowNull: false },
    title: Sequelize.STRING(30),
    title_of_courtesy: Sequelize.STRING(25),
    birth_date: Sequelize.DATE,
    hire_date: Sequelize.DATE,
    address: Sequelize.STRING(60),
    city: Sequelize.STRING(15),
    region: Sequelize.STRING(15),
    postal_code: Sequelize.STRING(10),
    country: Sequelize.STRING(15),
    home_phone: Sequelize.STRING(24),
    extension: Sequelize.STRING(4),
    photo: Sequelize.BLOB,
    notes: Sequelize.TEXT,
    reports_to: Sequelize.SMALLINT, //fk 1:m supervisor -> emp
    photo_path: Sequelize.STRING(255)
  })
  Employees.hasOne(Employees, {as: 'supervisor', foreignKey: 'reports_to'} )
  Employees.belongsToMany(Territories, {through: EmployeeTerritories, foreignKey: 'employee_id'})
  Territories.belongsToMany(Employees, {through: EmployeeTerritories, foreignKey: 'territory_id'})
  // Employees.hasMany(EmployeeTerritories, {foreignKey: 'employee_id'})
  
  // Employees.sync().then( () => {console.log('success')}).catch( err => {console.error(err)} )
  // Employees.sync().then( () => {console.log('success')}, err => {console.log(err)} )
  // employee_id smallint NOT NULL,
  // last_name character varying(20) NOT NULL,
  // first_name character varying(10) NOT NULL,
  // title character varying(30),
  // title_of_courtesy character varying(25),
  // birth_date date,
  // hire_date date,
  // address character varying(60),
  // city character varying(15),
  // region character varying(15),
  // postal_code character varying(10),
  // country character varying(15),
  // home_phone character varying(24),
  // extension character varying(4),
  // photo bytea,
  // notes text,
  // reports_to smallint,
  // photo_path character varying(255),
  // CONSTRAINT pk_employees PRIMARY KEY (employee_id),
  // CONSTRAINT fk_employees_employees FOREIGN KEY (reports_to)
  //     REFERENCES public.employees (employee_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION
  
  const Products = sequelize.define( 'products', {  
    product_id: { type: Sequelize.SMALLINT, unique: true, allowNull: false, primaryKey: true },
    product_name: { type: Sequelize.STRING(40),  allowNull: false },
    supplier_id: Sequelize.SMALLINT, //fk 1:m sup -> prod
    category_id: Sequelize.SMALLINT, //fk 1:m cat -> prod
    quantity_per_unit: Sequelize.STRING(20),
    unit_price: Sequelize.REAL,
    units_in_stock: Sequelize.SMALLINT,
    units_on_order: Sequelize.SMALLINT,
    reorder_level: Sequelize.SMALLINT,
    discontinued: { type: Sequelize.INTEGER,  allowNull: false }
  })
  Categories.hasMany(Products, {foreignKey: 'category_id'})
  Suppliers.hasMany(Products, {foreignKey: 'supplier_id'})
  // Products.sync()
  // product_id smallint NOT NULL,
  // product_name character varying(40) NOT NULL,
  // supplier_id smallint,
  // category_id smallint,
  // quantity_per_unit character varying(20),
  // unit_price real,
  // units_in_stock smallint,
  // units_on_order smallint,
  // reorder_level smallint,
  // discontinued integer NOT NULL,
  // CONSTRAINT pk_products PRIMARY KEY (product_id),
  // CONSTRAINT fk_products_categories FOREIGN KEY (category_id)
  //     REFERENCES public.categories (category_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION,
  // CONSTRAINT fk_products_suppliers FOREIGN KEY (supplier_id)
  //     REFERENCES public.suppliers (supplier_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION
  
  const Orders = sequelize.define( 'orders', {
    order_id: { type: Sequelize.SMALLINT, unique: true, allowNull: false, primaryKey: true }, 
    customer_id: Sequelize.STRING(15), //fk 1:m cus -> ord      //bpchar 
    employee_id: Sequelize.SMALLINT,   //fk 1:m emp -> ord
    order_date: Sequelize.DATE,
    required_date: Sequelize.DATE,
    shipped_date: Sequelize.DATE,
    ship_via: Sequelize.SMALLINT,      //fk 1:m shp -> ord
    freight: Sequelize.REAL,
    ship_name: Sequelize.STRING(40),       
    ship_address: Sequelize.STRING(60),    
    ship_city: Sequelize.STRING(15),       
    ship_region: Sequelize.STRING(15),     
    ship_postal_code: Sequelize.STRING(10),
    ship_country: Sequelize.STRING(15)     
  })
  Customers.hasMany(Orders, {foreignKey: 'customer_id'} )
  Employees.hasMany(Orders, {foreignKey: 'employee_id'} );
  Shippers.hasMany(Orders, {foreignKey: 'ship_via'} );
  // Orders.sync()
  // order_id smallint NOT NULL,
  // customer_id bpchar,
  // employee_id smallint,
  // order_date date,
  // required_date date,
  // shipped_date date,
  // ship_via smallint,
  // freight real,
  // ship_name character varying(40),
  // ship_address character varying(60),
  // ship_city character varying(15),
  // ship_region character varying(15),
  // ship_postal_code character varying(10),
  // ship_country character varying(15),
  // CONSTRAINT pk_orders PRIMARY KEY (order_id),
  // CONSTRAINT fk_orders_customers FOREIGN KEY (customer_id)
  //     REFERENCES public.customers (customer_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION,
  // CONSTRAINT fk_orders_employees FOREIGN KEY (employee_id)
  //     REFERENCES public.employees (employee_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION,
  // CONSTRAINT fk_orders_shippers FOREIGN KEY (ship_via)
  //     REFERENCES public.shippers (shipper_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION
  
  // n:m
  const OrderDetails = sequelize.define( 'order_details', { 
    order_id: { type: Sequelize.SMALLINT, allowNull: false },   //fk 1:m ord  -> det
    product_id: { type: Sequelize.SMALLINT, allowNull: false }, //fk 1:m prod -> det
    unit_price: { type: Sequelize.REAL, allowNull: false }, 
    quantity: { type: Sequelize.SMALLINT, allowNull: false }, 
    discount: { type: Sequelize.REAL, allowNull: false } 
  })
  Orders.belongsToMany(Products, { through: 'order_details', foreignKey: 'order_id'} )
  Products.belongsToMany(Orders, { through: 'order_details', foreignKey: 'product_id'} )
  
  // Orders.belongsToMany(Products, { through: OrderDetails, foreignKey: 'order_id'} )
  // Products.belongsToMany(Orders, { through: OrderDetails, foreignKey: 'product_id'} )
  
  // OrderDetails.removeAttribute('id')
  // Territories.removeAttribute('id')
  
  // Order.belongsToMany(Territories, {through: EmployeeTerritories, foreignKey: 'employee_id'})
  // OLD
  // Orders.hasMany(OrderDetails, {foreignKey: 'order_id'} )
  // Products.hasMany(OrderDetails, {foreignKey: 'product_id'} )
  // DO NOT USE IN WORKERCODE
  // OrderDetails.sync( {force : true} )
  
  // OrderDetails.sync()
  // order_id smallint NOT NULL,
  // product_id smallint NOT NULL,
  // unit_price real NOT NULL,
  // quantity smallint NOT NULL,
  // discount real NOT NULL,
  // CONSTRAINT pk_order_details PRIMARY KEY (order_id, product_id),
  // CONSTRAINT fk_order_details_orders FOREIGN KEY (order_id)
  //     REFERENCES public.orders (order_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION,
  // CONSTRAINT fk_order_details_products FOREIGN KEY (product_id)
  //     REFERENCES public.products (product_id) MATCH SIMPLE
  //     ON UPDATE NO ACTION ON DELETE NO ACTION
  
  
  } // prepModels
  
  
  //IMPORTANT NOTES on SEQUELIZE
  //Sequelize assumes your table has a id primary key property by default, will force it if Model doesnt have PK!
  //if your model has no primary key at all you can use Model.removeAttribute('id');
  
  //cannot create migration files from existing models :(
  //adding removing optional columns via migrations is pain :(
  
  
  
  




















// queries
// const query = 'SELECT * FROM customers LIMIT 1;'
// sequelize.query(query).spread((results, metadata) => { console.log(results); } )
// sequelize.query(query, {type: sequelize.QueryTypes.SELECT}).then( customers => { console.log(customers); } )
// Customers.findAll( {limit: 1} ).then( customers => { console.log(JSON.stringify(customers)) } )

// Customers.count().then( howmany => { console.log(JSON.stringify(howmany)) } )
// Categories.findAll().then( categories => { console.log(JSON.stringify(categories)) } )
// Employees.findAll().then( employees => { console.log(JSON.stringify(employees)) } )

// sequelize.query(query ).then( customers => { console.log(customers); } ) // with metadata
// Suppliers.findAll().then( x => { console.log( JSON.stringify( x ) ) } )
// const query = 'SELECT * FROM customers;'
// sequelize.query(query, 5, function(err, res){
//   // console.log(res);
// });
// sequelize.sync();
// const query = 'SELECT * FROM employees;'

// Employees.findAll( {limit: 5} )
// console.log(Employees.all( {limit: 5} ));
// console.log(Employees.count());








// Sequelize-Auto































function dropCreateDB() {
  const exec = require('child_process').exec;

  // let ss= exec('call db_logic\\dropCreateDB.bat', {})
  // let dropdb = exec('dropdb Xnorthwind_stg',  {})
  // let createdb = exec('createdb Xnorthwind_stg', {})

  // let dropdb = exec('dropdb northwind_stg',  {})
  // let createdb = exec('createdb northwind_stg', {})
  // let user = exec('psql -d northwind_stg -U rappie -c \"GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO ksmk;\"', {})
  
  // let dropdb = exec('dropdb northwind_stg',  {})
  // dropdb.on('exit', { } ).then( exec('createdb northwind_stg', {}) )
  // let user = exec('psql -d northwind_stg -U rappie -c \"GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO ksmk;\"', {})

  // let createdb = exec('createdb northwind_stg', {})
  // let user = exec('psql -d northwind_stg -U rappie -c \"GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO ksmk;\"', {})



  // user = exec('psql -d northwind_stg -U rappie -c \"GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO postgres;\"', {})
  // let user = exec('psql -d Xnorthwind_stg -U rappie -c \" \"', {})

  // let dropdb = exec('dropdb ' + process.env.DB_STG, {})
  // let createdb = exec('createdb ' + process.env.DB_STG, {})
  // dropdb = exec('dropdb ' + process.env.DB_DEV, {})

  
  // let createdb1 = exec('createdb ' + process.env.DB_DEV, {})
  // let childproc = exec('dropdb Xnorthwind_stg createdb Xnorthwind_stg', 
  // let childproc = exec('dropdb X${process.env.DB_STG} && createdb X${process.env.DB_STG}',
    // (error, stdout, stderr) => {
    //     // console.log('${stdout}');
    //     // console.log('${stderr}');
    //     // if (error !== null) {
    //     //     console.log('exec error: ${error}');
    //     // }
    // });  
  switch( process.env.NODE_ENV ) {
    case 'dev':
      // sequelize.query('DROP DATABASE IF EXISTS northwind_test;') 
      // sequelize.query('CREATE DATABASE northwind_test;') 
      // sequelize.query('GRANT ALL PRIVILEGES ON DATABASE northwind_test TO ksmk;') 
      break;
    case 'stg':
    // sequelize.sync()  
    // sequelize.query('GRANT ALL PRIVILEGES ON DATABASE Xnorthwind_stg TO ksmk;') ;
    // sequelize.query('DROP DATABASE IF EXISTS northwind_stg;') ;
    // sequelize.query('CREATE DATABASE northwind_stg;') ;
    // sequelize.query('GRANT ALL PRIVILEGES ON DATABASE northwind_stg TO ksmk;') ;
      break;
    case 'prd':
      break;
    default:
  }
}




