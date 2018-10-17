'use strict';

const sql = require('../query').categories;
const cs = {};


class CategoriesRep {
  constructor(db, pgp) {
      this.db = db;
      this.pgp = pgp;
    }

  //create POST
  create(values) {
    return this.db.one(sql.add, {
      // userId: +values.userId,
      // productName: values.name
    });
  }

  //read GET
  read(values) {
    return this.db.oneOrNone(sql.find, {
      // userId: +values.userId,
      // productName: values.name
    });
  }

  //update PUT



  //delete
  delete(id) {
    return this.db.result('DELETE FROM categories WHERE id = $1', +id, r => r.rowCount);
  }


}


module.exports = CategoriesRep;

