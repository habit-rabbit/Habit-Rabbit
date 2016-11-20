const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require("./query_class.js");
const Response = require("./response.js");
//routes that serve the data base and return a response object r


router.post("/users/create", (req, res) => {
  //this route implies we are looking to insert into users table
  let r = new Response();

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
      };
      //insert into database
      db.insertRow(query,  (err, data) => {
        if (err) r.setErrorMsg("Unable to save user, bad credentials!");
        //set data into response object 'r'
        r.setData(data);
        res.send(r);
      });
    });
  } else {
    //passwords didn't match
    r.setErrorMsg("The passwords do not match");
    res.send(r);
  }
});

router.get("/users", (req, res) => {
  const r = new Response();
  //checks to see if xhr was used, this prevents users from
  //accessing the api via its endpoint only
  if(req.xhr) {
    let query = req.query;
    query.table = "users";
    db.getAll(query, (err, data) => {
      r.setData(data);
      if (err) r.setErrorMsg("Unable to get all users!");
      res.send(r);
    });
  } else {
    res.redirect("/");
  }
})

router.get("/users/:id", (req, res) => {
  const r = new Response();
  //checks to see if xhr was used, this prevents users from
  //accessing the api via its endpoint only
  if(req.xhr) {
    let query = req.query;
    query.table = "users";
    // we can assign the req.params.id to our data object, but as there is no
    // data object being passed in from the ajax call we create an empty one
    //this preserves the formatting required for the database class
    query.data = {};
    query.data.id = req.params.id;
    db.getRow(query, (err, data) => {
      r.setData(data);
      //if there is an error that means a query was made with an invalid id
      // eg id = 'abcd'
      if (err) {
        r.setErrorMsg("Queried with invalid id!");
      }
      //if data is empty that means the id that was supplied for the query
      //does not exist in the database for users table
      if (!r.getData) {
        r.setErrorMsg(" User does not exist!");
      }
      console.log("success");
      res.send(r);
    });
  } else {
    res.redirect("/")
  }
})

//for the sake of demo and lack of willingness to set up method override
// delete and update methods will be posts for now..

router.post("/users/:id/update", (req, res) => {
  const r = new Response();
  //checks to see if xhr was used, this prevents users from
  //accessing the api via its endpoint only
  if(req.xhr) {
    let query = req.body
    query.table = "users";
    query.data.id = req.params.id;

    db.updateRow(query,  (err, data) => {
      r.setData(data);
      if (err) r.setErrorMsg("Unable to update user information");
      r.send(r);
    });
  } else {
    res.redirect("/")
  }
})
module.exports = router;
