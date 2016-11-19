const router = require('express').Router();
const db = require("./query_class.js");
//routes that serve the data base and return json


router.post("/goals", (req, res) => {
  //this route implies we are looking to insert into users table
  let query = req.body;
  query.table = "users"; //for definition required by db (need to dry up)
  db.insertRow(query, callback);
});

router.get("/goals", (req, res) => {
  let query = req.query;
  query.table = "goals";
  db.getAll(query, callback);
})

router.get("/goals/:id", (req, res) => {
  let query = req.query;
  query.table = "goals";
  // we can assign the req.params.id to our data object, but as there is no
  // data object being passed in from the ajax call we create an empty one
  //this preserves the formatting required for the database class
  query.data = {};
  query.data.id = req.params.id;
  db.getRow(query, callback);
})

router.post("/goals/:id/delete", (req, res) => {
  let query = req.body;
  query.table = "goals";
  query.data = {};
  query.data.id = req.params.id;
  db.delRow(query, callback);
});

module.exports = router;

function callback(data) {
  console.log(data);
  console.log("works");
}