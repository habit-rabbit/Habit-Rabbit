const router = require('express').Router();
const db = require("./query_class.js");
//routes that serve the data base and return json


router.post("/goals/create", (req, res) => {
  //this route implies we are looking to insert into users table
  if(req.xhr) {
    let query = req.body;
    query.table = "users"; //for definition required by db (need to dry up)
    db.insertRow(query,  (data) => {
      console.log("success");
      //sends an array back
      res.send(data);
    });
  } else {
    res.redirect("/");
  }
});

router.get("/goals", (req, res) => {
  if(req.xhr) {
    let query = req.query;
    query.table = "goals";
    db.getAll(query,  (data) => {
      console.log("success");
      //sends an array back
      res.send(data)
    });
  } else {
    res.redirect("/");
  }
})

router.get("/goals/:id", (req, res) => {
  if(req.xhr) {
    let query = req.query;
    query.table = "goals";
    // we can assign the req.params.id to our data object, but as there is no
    // data object being passed in from the ajax call we create an empty one
    //this preserves the formatting required for the database class
    query.data = {};
    query.data.id = req.params.id;
    db.getRow(query,  (data) => {
      console.log("success");
      //sends an array back
      res.send(data)
    });
  } else {
    res.redirect("/");
  }
})

router.post("/goals/:id/delete", (req, res) => {
  if(req.xhr) {
    let query = req.body;
    query.table = "goals";
    query.data = {};
    query.data.id = req.params.id;
    db.delRow(query,  (data) => {
      console.log("success");
      //sends an array back
      res.send(data)
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
