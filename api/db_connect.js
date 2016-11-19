const router = require('express').Router();


const knexConfig    = require("./knexfile");
const knex          = require("knex")(knexConfig[ENV]);
const ENV = process.env.ENV || "development";

knex.select('*')
    .from('users')
    .then( (data) => {
        console.log(data);
    });


    module.exports = router;