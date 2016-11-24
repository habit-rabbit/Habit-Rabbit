const router = require('express').Router();
const db = require("../api/query_class.js");
const bcrypt = require('bcrypt');
const ResponseData = require('../api/response.js');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  let isLoggedIn;
  let name;
  if (req.session['user-id']){
    isLoggedIn = true;
    const query = {};
    query.data = {};
    query.table = 'users';
    query.data.id = req.session['user-id'];
    //query data base for user, if found grab hash and compare to pw
    db.getRow(query, (err, data) => {
      if (err) {
        console.log("DB Error when querying user")
      } else {
        name = data[0].first_name;
        res.json({name: name, isLoggedIn: isLoggedIn});
      }
    });
  } else {
    isLoggedIn = false;
    name = '';
    res.json({name: name, isLoggedIn: isLoggedIn});
  }
});

router.post('/logout', (req, res) =>{
  req.session = null;
  res.json({isLoggedIn: false});

});

router.post('/login', (req, res) => {
  const r = new ResponseData();
  const pw = req.body.data.password;
  const query = {};
  query.data = {};
  query.table = 'users';
  query.data.email = req.body.data.email;
  //query data base for user, if found grab hash and compare to pw
  db.getRow(query, (err, data) => {
    const responder = function() {res.json(r);}
    //if err, the query was made with an invalid email;
    if (err) {
      r.setErrorMsg("Invalid credentials, please try again or signup");
      responder();
    } else if (!data.length) {
      //if data is empty that means the email supplied did not match
      // a record in the db
      r.setErrorMsg(`Incorrect email or password!`);
      responder();
    } else {
      //database found user
      let user = data[0];
      // compare password to has...
      bcrypt.compare(pw, user.password_digest, function(err, result) {
        if(err) {
          throw err;
        }
        if(result) {
          //setcookie
          req.session["user-id"] = user.id;
          r.setData({isLoggedIn: true});

        }
        responder();
      });
    }
  });
});
module.exports = router;
