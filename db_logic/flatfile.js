
// pg promise tests

'use strict';

const express = require('express');
const app = express();


const dbconfig = {
  host: 'localhost',
  port: 5432,
  database: 'northwind',
  user: 'ksmk',
  password: 'chujniax'
};

const promise = require('bluebird');
const pgconfig = {
  promiseLib: promise
}

const pgp = require('pg-promise')(pgconfig)
const db = pgp(dbconfig)

const enumSql = require('pg-promise').utils.enumSql;




// function getAll(tableName, callback) {
//   db.any(`SELECT * FROM ${tableName}`)
//   .then((result) => {
//     callback(null, result);
//   })
//   .catch((err) => {
//     callback(err);
//   });
// }

// PUT
// DELETE

function POST(url, handler) {
  app.post(url, (req, res) => {
    handler(req)
      .then(data => {
        res.json({
            success: true,
            data
        })
        ,console.log(req.params)
        ,console.log(req.body)
        ,console.log(req.url)
        ,console.log(req.query)
        ,console.log(JSON.stringify(req.query))
        ;
      })
      .catch(error => {
        res.json({
            success: false,
            error: error.message || error
        })
        ,console.log(req.params)
        ,console.log(req.body)
        ,console.log(req.url)
        ,console.log(req.query)
        ,console.log(JSON.stringify(req.query))
        ;
      });
  });
}

function GET(url, handler) {  
  app.get(url, (req, res) => {
    handler(req)
      .then(data => {
        res.json({
            success: true,
            data
        });
      })
      .catch(error => {
        res.json({
            success: false,
            error: error.message || error
        });
      });
  });
}

const opts = { rowMode: 'array' } 

const pg = require('pg-promise').ParameterizedQuery;

const create_customer = new pg( 'INSERT INTO customers( customer_id, company_name ) VALUES($1, $2) RETURNING *'  );
create_customer.rowMode = 'array'
// pg.ParameterizedQuery.rowMode = 'array';
// const create_another = new pg( 'SELECT * FROM customers' );
// POST('/customers/create', req => db.customers.create(req.params) );
GET('/customers', () => db.any( 'SELECT * FROM customers' ) );
// POST('/customers/create/:customer_name/:customer_id', () => db.any( 'INSERT INTO customers(customer_id, company_name) VALUES( customer_id, customer_name)' ) );
// POST('/customers/create', () => db.one( 'INSERT INTO customers( customer_id, company_name ) VALUES( $1, $2 )', ['XCXYX', 'Any_Company 634']  ) );
// POST('/customers/create', () => db.one( 'INSERT INTO customers( customer_id, company_name ) VALUES( UPPER(SUBSTRING( $1 from 1 for 5)), $1 )', ['Any_Company 634'] ));
// POST('/customers/create/', req => db.one( create_customer, req.params ));

// POST('/customers/create/:first/:second', req => db.one( create_customer, req.params ));
// POST('/customers/create', req => db.one( create_customer, [ 'XXATA', 'Any_Company 634'] ));


POST('/customers/create', req => db.one( create_customer, {} ));

// POST('/customers/create', req => db.one( create_customer, req.body ));

// POST('/customers/create', () => db.one( 'INSERT INTO customers( customer_id, company_name ) VALUES( regexp_replace( UPPER(SUBSTRING( $1 from 1 for 5)), '[^\w]+|_',''), $1 )', ['Any_Company 634'] ));

// [ 'XXATA', 'Any_Company 634']
//  { 1: 'XXATA', 2: 'Any_Company 634' }
// [ customer_id: 'XXATA', company_name: 'Any_Company 634'] 
// { customer_id: 'XXATA', company_name: 'Any_Company 634'}


// XXXX
// POST('/customers/create/:customerId/:customer', req => {
//   return db.task('add-product', t => {
//     return t.products.find(req.params)
//       .then(product => {
//         return product || t.products.add(req.params);
//       });
//   });
// });
//



const port = 3000;

app.listen(port, () => {
  console.log('\nReady for requests on http://localhost:' + port);
});



module.exports = enumSql(__dirname, {recursive: true}, file => {
  // NOTE: 'file' contains the full path to the SQL file, as we use __dirname for enumeration.
  return new QueryFile(file, {
    minify: true,
    params: {
      schema: 'public' // replace ${schema~} with "public"
    }
  });
});




