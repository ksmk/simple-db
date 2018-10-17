'use strict'

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

exports.sql = function(file) {
  const fullPath = path.join(__dirname, file);
  const options = {
     minify: true,
      params: {
          schema: 'public' // replace ${schema~} with "public"
      }
  };
  const qf = new QueryFile(fullPath, options);
  if (qf.error) {
      // Something is wrong with our query file :(
      // Testing all files through queries can be cumbersome,
      // so we also report it here, while loading the module:
      console.error(qf.error);
  }
  return qf;
}


exports.
