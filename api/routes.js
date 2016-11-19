const router = require('express').Router();
const db = require("./query_class.js");
//routes that serve the data base and return json
router.post("/api/users", (req, res) => {
  const params = req.body;
  db.query(params, callback)

});

router.get("/api/users", (req, res) => {
  //since we are getting all users
  //req.body should be formatted via ajax like
  //  type: 'getAll',
  // table: 'users',
  // data: {},
  //SEE query_class.js
  const query = req.body;
  db.query(params, callback)
})


function callback(data) {
  console.log(data);
  console.log("works");
}

module.exports = router;