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

// in the instance


module.exports = router;