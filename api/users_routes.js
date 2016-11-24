const router = require('express').Router();
const bcrypt = require('bcrypt');
const db = require("./query_class.js");
const ResponseData = require("./response.js");
const findTable = require("./utilities/find_table.js");
const Validations = require("./utilities/validations.js")
//routes that serve the data base and return a response object r

router.post("/users/create", (req, res) => {
  let r = new ResponseData();
  let isValidCredentials = new Validations(req.body.data).check();
  if(req.body.data.password === req.body.data.password_confirmation) {
    if (isValidCredentials) {
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
          if (err) {
            r.setErrorMsg("Unable to save user, bad credentials!");
          } else {
          //set data into responseData object 'r'
          // with user id
          // data ? r.setData({id: data[0].id}) : r.setErrorMsg("Email already used");
          console.log("registration data ", data[0].id);
          req.session["user-id"] = data[0].id;
          r.setData({isLoggedIn: true});
          res.send(r);
        }

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

module.exports = router;
