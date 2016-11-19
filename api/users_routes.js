const router = require('express').Router();
const db = require("./query_class.js");
//routes that serve the data base and return json


router.post("/users", (req, res) => {
  //this route implies we are looking to insert into users table
  let query = req.body;
  query.table = "users"; //for definition required by db (need to dry up)
  db.insert(query, callback)
});

router.get("/users", (req, res) => {
  let query = req.query;
  query.table = "users";
  db.getAll(query, callback)
})

router.get("/users/:id", (req, res) => {
  let query = req.query;
  query.table = "users";
  // we can assign the req.params.id to our data object, but as there is no
  // data object being passed in from the ajax call we create an empty one
  //this preserves the formatting required for the database class
  query.data = {};
  query.data.id = req.params.id;
  db.getRow(query, callback)
})

module.exports = router;

function callback(data) {
  console.log(data);
  console.log("works");
}
