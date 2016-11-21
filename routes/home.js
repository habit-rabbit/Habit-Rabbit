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
  //query data base for user, if found grab hash and compare to pw
  db.getRow(query, (err, data) => {
    //if err, the query was made with an invalid email;
    if (err) {
      r.setErrorMsg("Invalid credentials, please try again or signup")
      res.send(r);
    }
    if (!r.getData()) {
      //if data is empty that means the email supplied did not match
      // a record in the db
      r.setErrorMsg(`Incorrect email or password!`);
      res.send(r);
    } else {
      //database found user
      let user = data[0];
      // compare password to has...
      bcrypt.compare(pw , user.password_digest, function(err, result) {
        if(err) {
          throw err;
        }
        if(result) {
          //setcookie
          req.session["user-id"] = user.id;
          r.setData({first_name: user.first_name, id: user.id});
          // res.redirect("/");
          res.send(r);
        }
      });
    }
  })

})
module.exports = router;
