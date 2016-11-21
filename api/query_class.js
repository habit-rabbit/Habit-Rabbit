
// const ENV = process.env.ENV || "development";
const knexConfig    = require("../knexfile");
const k          = require("knex")(knexConfig[ENV]);


function database() {
  this.knex = k;
}

database.prototype.delRow = function (query, callback) {
  this.knex(query.table)
    .where(query.data)
    .del()
    .asCallback(callback);
}

database.prototype.insertRow = function (query, callback) {
  this.knex(query.table)
    .insert(query.data)
    .returning("*") //makes it so callback will have data which = the inserted row as an array on sucess
    .asCallback(callback);
}

database.prototype.getRow = function (query, callback) {
  this.knex(query.table)
    .where(query.data)
    .asCallback(callback);
}

database.prototype.getAll = function (query, callback) {
  this.knex
    .select()
    .table(query.table)
    .asCallback(callback);
}

database.prototype.updateRow = function (query, callback) {
  this.knex(query.table)
    .where("id", query.data.id)
    .update(query.data)
    .asCallback(callback);
}

database.prototype.getAllWhere = function (query, callback) {
  this.knex
    .select()
    .table(query.table)
    .where(query.data)
    .asCallback(callback);
}

module.exports = new database();
