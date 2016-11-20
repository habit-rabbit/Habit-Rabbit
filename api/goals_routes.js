const router = require('express').Router();
const db = require("./query_class.js");
const Response = require("./response.js");
//routes that serve the data base and return json


router.post("/goals/create", (req, res) => {
  const r = new Response();
  //this route implies we are looking to insert into goals table
  if(req.xhr) {
    let query = req.body;
    query.table = "goals"; //for definition required by db (need to dry up)
    db.insertRow(query,  (err, data) => {
      if (err) r.setErrorMsg("Unable to save the goal :(");
      r.setData(data);
      res.send(r);
    });
  } else {
    res.redirect("/");
  }
});

router.get("/goals", (req, res) => {
  const r = new Response();
  if(req.xhr) {
    let query = req.query;
    query.table = "goals";
    db.getAll(query,  (err, data) => {
      if (err) r.setErrorMsg("Everything is broken come back later (sorry and thanks).");
      r.setData(data);
      res.send(r);
    });
  } else {
    res.redirect("/");
  }
});

router.get("/goals/:id", (req, res) => {
  const r = new Response();
  if(req.xhr) {
    let query = req.query;
    query.table = "goals";
    // we can assign the req.params.id to our data object, but as there is no
    // data object being passed in from the ajax call we create an empty one
    //this preserves the formatting required for the database class
    query.data = {};
    query.data.id = req.params.id;
    db.getRow(query,  (err, data) => {
      if (err) r.setErrorMsg("Invalid goal id, try again (or don't, I don't care. Follow your dreams).");
      if (!r.getData()) r.setErrorMsg("That goal doesn't exist.");
      r.setData(data);
      res.send(r);
    });
  } else {
    res.redirect("/");
  }
});

router.post("/goals/:id/delete", (req, res) => {
  const r = new Response();
  if(req.xhr) {
    let query = req.body;
    query.table = "goals";
    query.data = {};
    query.data.id = req.params.id;
    db.delRow(query,  (err, data) => {
      if (err) r.setErrorMsg("Something went wrong and we couldn't delete your goal. GUESS YOU HAVE TO DO IT NOW, SUCKER!");
      r.setData(data);
      res.send(r);
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
