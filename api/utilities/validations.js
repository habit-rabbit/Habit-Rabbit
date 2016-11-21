const db = require('../query_class.js');
//================validation class
// a utility to chain validations for data and returns a boolean
// if it passed all validations
//
// how to use:
// create new instance of Validations with your data as an argument
// this argument must not be an object
//
// v = new Validations("test");
// from here there are a few methods at your disposable...
//  v.empty().check() -> checks if argument is not an empty string
//  v.number().check() -> checks if argument is an integer
//  v.email().check() -> checks if argument is an email address
//  v.unique(table, column).check() -> queries database and checks if
//    argument is unique against a column in that table
//
// =======where the magic happens is that you can chain these=======
//  eg: my data is an email address : "test@test.com"
//
// var valid = new Validation("test@test.com")
// .empty()
// .email()
// .unique("users", "email")
// .check()
// ~~~~~~~~>will return a boolean whether or not it passed each validation!




function Validations(data) {
  this.tests = [];
  this.data = data;
  this.isNumber = function() {
    return Number.isInteger(this.data);
  }
}

Validations.prototype.empty = function() {
  let string = this.data.trim();
  this.tests.push(string.length > 0);
  return this;
}

Validations.prototype.number = function() {
  this.tests.push(Number.isInteger(this.data));
  return this;
}

Validations.prototype.email = function() {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = this.data.toLowerCase();
  this.tests.push(re.test(email));
  return this;
}

Validations.prototype.unique = function(table, column) {
  const query = {};
  query.table = table;
  //query database for the table
  db.getAll(query, (err, res) => {
    //get all results and check this.data against column in table
   let result = res.every((elm) => {
      return elm[column] !== this.data;
    });
   this.tests.push(result);
  });
  return this;
}

Validations.prototype.check = function() {
  let result = this.tests.every(function(elm) {
    return elm == true;
  })
  return result;
}

module.exports = Validations
