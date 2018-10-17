'use strict';

// renaming and exporting all repository classes:
// what for ?
const func = require('./customers');

module.exports = {
  customers: {
    // create: sql('customers/create.sql'),
    // empty: sql('customers/empty.sql'),
    // init: sql('customers/init.sql'),
    // drop: sql('customers/drop.sql'),
    add: func.sql('customers/add.sql')
  }
  // },
  // products: {
  //     create: sql('products/create.sql'),
  //     empty: sql('products/empty.sql'),
  //     drop: sql('products/drop.sql'),
  //     find: sql('products/find.sql'),
  //     add: sql('products/add.sql')
  // }
}

// module.exports = {
//   Users: require('./users'),
//   Products: require('./products')
// };



const enumSql = require('pg-promise').utils.enumSql;
module.exports = enumSql(__dirname, {recursive: true}, file => {
    // NOTE: 'file' contains the full path to the SQL file, as we use __dirname for enumeration.
    return new QueryFile(file, {
        minify: true,
        params: {
            schema: 'public' // replace ${schema~} with "public"
        }
    });
});
