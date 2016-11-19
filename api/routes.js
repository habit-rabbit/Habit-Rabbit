const router = require('express').Router();
const db = require("./query_class.js");
const usersRoutes = require("./users_routes.js")
const goalsRoutes = require("./goals_routes.js")
//routes that serve the data base and return json

router.use("/api", usersRoutes);
router.use("/api", goalsRoutes);

//the db class requires a format from ajax
//like this

// $.ajax({
//   method: Post or Get,
//   url: path/to/url,
//   data: {query object}
//   this object could be all the necessary components to insert a row
// })
// the type of crud function is inferred from the url
// ie /users with a GET would get all users from database
// where as /users with a POST would insert a user
// similarily /users/8 with GET would get that user with id 9
// from the data base
// ====================================================

// a more verbose example:

    // $.ajax({
    //   method: 'post',
    //   url: '/api/users',
    //   data: {
    //     data: {
    //       first_name: "Serious",
    //       last_name: "Granger",
    //       email: "iLoveCats@hogwarts.uk",
    //       password_digest: "notdigested"
    //     }
    //   }
    // });
    //  it has not been implemented yet but we will find a way to route
    // to the update function for that users id via a cookie

  // $.ajax({
    //   method: 'post',
    //   url: '/api/users/9/update',
    //   data: {
    //     data: {
    //       first_name: "UltraaSerious",
    //       last_name: "Granger",
    //       email: "iLoveCats@hogwarts.uk",
    //       password_digest: "notdigested"
    //     }
    //   }
    // });

// ======================Please note I haven't written and real callback to send
// responses back to the ajax calls, everything console logs as a aproof of concept
// try /api/users, /api/goals etc..

// also ***********I noticed we need to make migrations for the tables to
// cascasde on delete from goals to tasks
module.exports = router;