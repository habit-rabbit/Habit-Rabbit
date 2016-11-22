const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require("./query_class.js");
const ResponseData = require("./response.js");
const findTable = require("./utilities/find_table.js");
const Validations = require("./utilities/validations.js")
//routes that serve the data base and return a response object r


router.post("/users/create", (req, res) => {

  //this route implies we are looking to insert into users table
  let r = new ResponseData();
  let isValidCredentials = new Validations(req.body.data).check();
  let isUniqueEmail = new Validations(req.body.data.email).unique().check();
  if(req.body.data.password === req.body.data.password_confirmation) {
    if (isValidCredentials  && isUniqueEmail) {
      bcrypt.hash(req.body.data.password, 10, (err, hash) => {
        //set up query object..
        const query = {};
        query.table = findTable(req.url);
        query.data = {
          first_name: req.body.data.first_name,
          last_name: req.body.data.last_name,
          email: req.body.data.email,
          password_digest: hash
        };
        //insert into database
        db.insertRow(query,  (err, data) => {
          if (err) r.setErrorMsg("Unable to save user, bad credentials!");
          //set data into responseData object 'r'
          // with user id
          r.setData({id: data[0].id});
          res.send(r);
        });
      });
    } else {
      r.setErrorMsg("You fudged up");
      res.send(r);
    }
  } else {
    //passwords didn't match
    r.setErrorMsg("The passwords do not match");
    res.send(r);
  }
});

router.get("/users", (req, res) => {
  const r = new ResponseData();
  //checks to see if xhr was used, this prevents users from
  //accessing the api via its endpoint only
  if(req.xhr) {
    let query = req.query;
    query.table = findTable(req.url);
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
  const r = new ResponseData();
  //checks to see if xhr was used, this prevents users from
  //accessing the api via its endpoint only
  if(req.xhr) {
    let query = req.query;
    query.table = findTable(req.url);
    // we can assign the req.params.id to our data object, but as there is no
    // data object being passed in from the ajax call we create an empty one
    //this preserves the formatting required for the database class
    query.data = {};
    query.data.id = req.params.id;
    db.getRow(query, (err, data) => {
      //if there is an error that means a query was made with an invalid id
      // eg id = 'abcd'
      if (err) {
        r.setErrorMsg("Queried with invalid id!");
        res.send(r);
      } else {
      //if data is empty that means the id that was supplied for the query
      //does not exist in the database for users table
        data.length ? r.setData(data) : r.setErrorMsg("user does not exist");
        res.send(r);
      }
    });
  } else {
    res.redirect("/");
  }
})

//for the sake of demo and lack of willingness to set up method override
// delete and update methods will be posts for now..

router.post("/users/:id/update", (req, res) => {
  const r = new ResponseData();
  //checks to see if xhr was used, this prevents users from
  //accessing the api via its endpoint only
  if(req.xhr) {
    let query = req.body
    query.table = findTable(req.url);
    query.data.id = req.params.id;

    db.updateRow(query,  (err, data) => {
      r.setData(data);
      if (err) r.setErrorMsg("Unable to update user information");
      res.send(r);
    });
  } else {
    res.redirect("/");
  }
});

router.get("/users/:id/goals", (req, res) => {
  const r = new ResponseData();
  if (req.xhr) {
    let query = {};
    query.table = findTable(req.url);
    query.data = {user_id: req.params.id}
    db.getAllWhere(query, (err, data) => {
      if (err) {
        // If there's an error here, the query has an invalid format
        r.setErrorMsg("You're trying to do a thing that isn't a thing. STAHP.");
        res.send(r);
      } else {
        // If there's an error here, the format is valid but the user doesn't exist
        data.length ? r.setData(data) : r.setErrorMsg ("Sources say this user doesn't exist. Are you a ghost?");
        res.send(r);
      }
    });
  } else {
    res.redirect("/");
  }
});

router.get("/users/:id/goals/:goal_id", (req, res) => {
  const r = new ResponseData();
  if (req.xhr) {
    let query = {};
    query.table = findTable(req.url);
    query.data = {id: req.params.goal_id, user_id: req.params.id}
    db.getAllWhere(query, (err, data) => {
      // If there's an error here, the query has an invalid format
      if (err) {
        r.setErrorMsg ("That goal doesn't exist! Make it your goal to make this goal a goal. (goal goal goal).");
        res.send(r);
      } else {
        // If there's an error here, the user is trying to access another user's goals
        data.length ? r.setData(data) : r.setErrorMsg ("This isn't one of your goals! Stop creeping, you creeper.");
        res.send(r);
      }
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
