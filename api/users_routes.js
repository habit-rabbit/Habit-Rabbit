const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require("./query_class.js");
const Response = require("./response.js")
//routes that serve the data base and return json


router.post("/users/create", (req, res) => {
  //this route implies we are looking to insert into users table
  let r = new Response();
  let query = req.body;

  if(req.body.data.password === req.body.data.password_confirmation) {
    bcrypt.hash(req.body.data.password, 10, (err, hash) => {
      //set up query object..
      const query = {};
      query.table = "users"; //for definition required by db (need to dry up)
      query.data = {
        first_name: req.body.data.first_name,
        last_name: req.body.data.last_name,
        email: req.body.data.email,
        password_digest: hash
      }
      //insert into database
      db.insertRow(query,  (data) => {
        console.log("success");
        //set data into response object 'r'
        r.setData(data)
        res.send(r);
      });
    });
  } else {
    r.setErrorMsg("The passwords do not match");
    res.send(r);
  }
});

router.get("/users", (req, res) => {
  //checks to see if xhr was used, this prevents users from
  //accessing the api via its endpoint only
  if(req.xhr) {
    let query = req.query;
    query.table = "users";
    db.getAll(query, (data) => {
      console.log("successfully logged in");
      //sends an array back
      res.send(data)
    });
  } else {
    res.redirect("/");
  }
})

router.get("/users/:id", (req, res) => {

  if(req.xhr) {
    let query = req.query;
    query.table = "users";
    // we can assign the req.params.id to our data object, but as there is no
    // data object being passed in from the ajax call we create an empty one
    //this preserves the formatting required for the database class
    query.data = {};
    query.data.id = req.params.id;
    db.getRow(query, (data) => {
      console.log("success");
      //sends an array back
      res.send(data);
    });
  } else {
    res.redirect("/")
  }
})

//for the sake of demo and lack of willingness to set up method override
// delete and update methods will be posts for now..

router.post("/users/:id/update", (req, res) => {
  if(req.xhr) {
    let query = req.body
    query.table = "users";
    query.data.id = req.params.id;

    db.updateRow(query,  (data) => {
      console.log("success");
      //sends an array back
      res.send(data);
    });
  } else {
    res.redirect("/")
  }
})
module.exports = router;

// function callback(data) {
//   console.log(data);
//   console.log("works");
//   res.JSON("Good");
// }

// function response(res) {

//   res.send("okay");
// }