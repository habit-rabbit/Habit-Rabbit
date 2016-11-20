const router = require('express').Router();
const db = require("../api/query_class.js");
router.get('/', (req, res) => {
  res.render('index');
});


router.put('/login', (req, res) => {


})
module.exports = router;
