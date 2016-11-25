const router = require('express').Router();
const db = require("./query_class.js");
const ResponseData = require("./response.js");
const findTable = require("./utilities/find_table.js");
const Validations = require("./utilities/validations.js");
//routes that serve the data base and return json


router.post("/goals/create", (req, res) => {
  const r = new ResponseData();
  let isValidCredentials = new Validations(req.body.data).check();
  if (req.xhr && req.session['user-id']) {
    let query = {};
    query.table = findTable(req.url);
    query.data = req.body.data;
    query.data.user_id = req.session['user-id'];
    if(isValidCredentials) {
      db.insertRow(query,  (err, data) => {
        if(err){
        r.setErrorMsg("Unable to save the goal :(");
        }
        r.setData(data);
        res.send(r);
      });
    } else {
      r.setErrorMsg("Goal needs to have a name");
      res.send(r);
    }
  } else { //if not authenticated
    res.redirect("/");
  }
});

router.get("/goals", (req, res) => {
  const r = new ResponseData();
  if (req.xhr && req.session['user-id']) {
    let query = req.query;
    query.table = findTable(req.url);
    query.data = {user_id: req.session['user-id']};
    db.getAllWhere(query,  (err, data) => {
      if (err) r.setErrorMsg("Everything is broken come back later (sorry and thanks).");
      r.setData(data);
      res.send(r);
    });
  } else {
    res.redirect("/");
  }
});

router.get("/goals/:id", (req, res) => {
  const r = new ResponseData();
  if (req.xhr && req.session['user-id']) {
    let query = req.query;
    query.table = findTable(req.url);
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
router.post("/goals/:id/update", (req, res) => {
  const r = new ResponseData();
  if(req.xhr && req.session['user-id']) {
    let query = req.body;
    query.table = findTable(req.url);
    query.data.id = req.params.id;
    db.updateRow(query, (err, data) => {
      if(err) {
        r.setErrorMsg("unable to update");
      } else {
        r.setData(data);
      }
      res.send(r);
    });
  } else {
    res.redirect("/");
  }
});
router.post("/goals/:id/delete", (req, res) => {
  const r = new ResponseData();
  if (req.xhr && req.session['user-id']) {
    let query = req.body;
    query.table = findTable(req.url);
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

router.get("/goals/:id/tasks", (req, res) => {
  const r = new ResponseData();
  if (req.xhr && req.session['user-id']) {
    let query = {};
    query.table = findTable(req.url);
    query.data = {goal_id: req.params.id}
    db.getAllWhere(query, (err, data) => {
      if (err) {
        // If there's an error here, the query has an invalid format
        r.setErrorMsg("You're trying to do a thing that isn't a thing. STAHP.");
        res.send(r);
      } else {
        // If there's an error here, the format is valid but the goal doesn't exist
        data.length ? r.setData(data) : r.setErrorMsg ("Sources say this goal doesn't exist. But you could make it exist. You have the power.");
        res.send(r);
      }
    });
  } else {
    res.redirect("/");
  }
});

router.post("/goals/:id/tasks/create", (req, res) => {
  const r = new ResponseData();
  if (req.xhr && req.session['user-id']) {
    let query = {};
    taskNames = req.body.data.taskNames;

    taskNames.map((taskName, index) => {
      let isValidCredentials = new Validations(query.data).check();
      query.table = findTable(req.url);
      query.data = {
        name: taskName,
        task_order: index + 1,
        is_done: false,
        goal_id: req.params.id
      };
      //check tasks for validations
      if(isValidCredentials) {
        db.insertRow(query, (err, data) => {
          if (err) {
            r.setErrorMsg("Your task didn't save i'm so sorry so sad oh noo");
          } else {
            data.length ? r.setData(data) : r.setErrorMsg("A different error message idk");
          }
        });
      } else {
        r.setErrorMsg("Could not save your task, is it blank?");
      }
    });
    res.send(r);

  } else {
    res.redirect("/");
  }
});

router.post("/goals/:id/tasks/:task_id/update", (req, res) => {
  const r = new ResponseData();
  if (req.xhr && req.session['user-id']) {
    let query = {};
    query.table = findTable(req.url);
    query.data = req.body;
    query.data.id = req.params.task_id;
    db.updateRow(query, (err, data) => {
      if (err) {
        r.setErrorMsg("Could not update!");
      } else {
        r.setData(data);
        res.send(r);
      }
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
