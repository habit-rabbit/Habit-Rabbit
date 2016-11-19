const router = require('express').Router();
const db = require("./query_class.js");
//routes that serve the data base and return json


router.post("/api/users", (req, res) => {
  let query = req.body;
  req.body.table = "users"; //for definition required by db (need to dry up)
  //this route implies we are looking to insert into users table
  db.insert(query, callback)
});

router.get("/api/users", (req, res) => {
  req.query.table = "users";
  let query = req.query;
  db.getAll(query, callback)
})

router.get("/api/users/:id", (req, res) => {
  req.query.table = "users";
  req.query.data = {};
  req.query.data.id = req.params.id;
  // we can assign the req.params.id to our query
  // since we are getting only one user
  let query = req.query;
  db.getRow(query, callback)
})


function callback(data) {
  console.log(data);
  console.log("works");
}

module.exports = router;