'use strict';

const sql = require('../query').customers;
const cs = {};


class CustomersRep {
  constructor(db, pgp) {
      this.db = db;
      this.pgp = pgp;
    }


//   customer_id bpchar NOT NULL,
//   company_name character varying(40) NOT NULL,


  //create POST
  create(values) {
    return this.db.one(sql.add, {
      // customerId: +values.customerId,
      // companyName: values.coname
    });
  }

  // //read GET
  // read(values) {
  //   return this.db.oneOrNone(sql.find, {
  //     // userId: +values.userId,
  //     // productName: values.name
  //   });
  // }

  // //update PUT



  // //delete
  // delete(id) {
  //   return this.db.result('DELETE FROM categories WHERE id = $1', +id, r => r.rowCount);
  // }


}


module.exports = CustomersRep;

// CREATE TABLE public.customers
// (
//   customer_id bpchar NOT NULL,
//   company_name character varying(40) NOT NULL,
//   contact_name character varying(30),
//   contact_title character varying(30),
//   address character varying(60),
//   city character varying(15),
//   region character varying(15),
//   postal_code character varying(10),
//   country character varying(15),
//   phone character varying(24),
//   fax character varying(24),
//   CONSTRAINT pk_customers PRIMARY KEY (customer_id)
// )
