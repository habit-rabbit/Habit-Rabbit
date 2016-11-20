const router = require('express').Router();
const db = require("../api/query_class.js");
const bcrypt = require('bcrypt');
const Response = require('../api/response.js')
router.get('/', (req, res) => {
  res.render('index');
});


router.post('/login', (req, res) => {
  const r = new Response();
  const pw = req.body.data.password;
  const query = {};
  query.data = {};
  query.table = 'users';
  query.data.email = req.body.data.email;
  //query data base for user, if found grab hash and compare to
  /// password entered in req.body.data.password
  db.getRow(query, (err, data) => {
    let user = data[0];
    // compare password to has...
    bcrypt.compare(pw , user.password_digest, function(err, result) {
      result ? console.log("works") : console.log("not worked");

    // res == true
  });
  })

})
module.exports = router;
    // let query = req.query;
    // query.table = "users";
    // // we can assign the req.params.id to our data object, but as there is no
    // // data object being passed in from the ajax call we create an empty one
    // //this preserves the formatting required for the database class
    // query.data = {};
    // query.data.id = req.params.id;
    // db.getRow(query, (err, data) => {
    //   //if there is an error that means a query was made with an invalid id
    //   // eg id = 'abcd'
    //   if (err) {
    //     r.setErrorMsg("Queried with invalid id!")
    //   }
    //   if (!r.getData()) {
    //     //if data is empty that means the id that was supplied for the query
    //     //does not exist in the database for users table
    //     r.setErrorMsg(`User does not exist!`);
    //   }
    //   r.setData(data);
    //   console.log("success");
    //   //sends an array back
    //   res.send(r);
    // });