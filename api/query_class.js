
const ENV = process.env.ENV || "development";
const knexConfig    = require("../knexfile");
const k          = require("knex")(knexConfig[ENV]);




function database() {
  this.knex = k;
}

database.prototype.insert = function (query, callback) {
  this.knex(query.table)
    .insert(query.data)
    .returning("*") //makes it so callback will have data which = the inserted row as an array on sucess
    .then(callback);
}
database.prototype.getAll = function (query, callback) {
  this.knex(query.table)
    .where(query.data)
    .then(callback)
}
database.prototype.getOne = function (query, callback) {
  this.knex
    .select()
    .table(query)
}
database.prototype.query = function(query, callback) {

  switch(query.type) {

    case 'insert':
      this.insert(query, callback)
      break;
    case 'delete':
      break;
    case 'update':
      break;
    case 'getAll'
      this.getAll(query, callback)
      break;
    case 'get'
      this.getOne(query, callback)
      break;
  }
}

module.exports = new database();