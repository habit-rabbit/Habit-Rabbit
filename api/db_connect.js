const ENV = process.env.ENV || "development";
const router = require('express').Router();
const knexConfig    = require("../knexfile");
const knex          = require("knex")(knexConfig[ENV]);

//routes that serve the data base and return json
const db = new database(knex);
router.post("/api/users", (req, res) => {
  const params = req.body;
  db.query(params)

});
knex.select('*')
    .from('users')
    .then( (data) => {
        console.log(data);
    });
    module.exports = router;


/*
  type: create
  table: user,
  data: obj

*/

function callback(data) {
  console.log(data);
  console.log("works");
}

function database(knex) {
  this.k = knex;
}

database.prototype.insert = function (query, callback) {
  this.k(query.table)
    .insert(query.data)
    .returning("*")
    .then(callback);
}

database.prototype.query = function(params) {

  switch(params.type) {

    case 'insert':
      console.log("yesss")
      this.insert(params, callback)
      break;
  }
}