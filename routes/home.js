const router = require('express').Router();
const db = require("../api/query_class.js");
const bcrypt = require('bcrypt');
router.get('/', (req, res) => {
  res.render('index');
});


router.post('/login', (req, res) => {
  const pw = req.body.data.password;
  const query = {};
  query.data = {};
  query.table = 'users';
  query.data.email = req.body.data.email;
  //query data base for user, if found grab hash and compare to
  /// password entered in req.body.data.password
  db.getRow(query, (err, data) => {
    let user = data[0];
    // compare password to has...
    bcrypt.compare(pw , user.password_digest, function(err, result) {
      result ? console.log("works") : console.log("not worked");

    // res == true
  });
  })

})
module.exports = router;
