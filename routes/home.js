const router = require('express').Router();
const db = require("../api/query_class.js");
router.get('/', (req, res) => {
  res.render('index');
});


router.post('/login', (req, res) => {
  const query = {};
  query.data = {};
  query.table = 'users';
  query.data.email = req.body.data.email;
  //query data base for user, if found grab hash and compare to
  /// password entered in req.body.data.password
  db.getRow(query, (err, data) => {
    let user = data[0];

  })
  console.log(query);

})
module.exports = router;
