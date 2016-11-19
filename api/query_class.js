
const ENV = process.env.ENV || "development";
const knexConfig    = require("../knexfile");
const k          = require("knex")(knexConfig[ENV]);


function database() {
  this.knex = k;
}

database.prototype.insertRow = function (query, callback) {
  this.knex(query.table)
    .insert(query.data)
    .returning("*") //makes it so callback will have data which = the inserted row as an array on sucess
    .then(callback);
}
database.prototype.getRow = function (query, callback) {
  this.knex(query.table)
    .where(query.data)
    .then(callback);
}
database.prototype.getAll = function (query, callback) {
  this.knex
    .select()
    .table(query.table)
    .then(callback);
}
database.prototype.delRow = function (query, callback) {
  this.knex(query.table)
    .where(query.data)
    .del()
    .then(callback);
}

module.exports = new database();