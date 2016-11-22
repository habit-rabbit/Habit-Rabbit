const db = require('../query_class.js');
//================validation class
// a utility to chain validations for given data and returns a boolean
// for the cumulative result of each validation
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

Validations.prototype.check = function() {
  let result = this.tests.every(function(elm) {
    return elm == true;
  })
  return result;
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

Validations.prototype.password = function() {
  // thanks stackoverflow for all the regex :)
  // const pw = this.data;
  // Minimum 8 characters at least 1 Alphabet and 1 Number:
  // const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character:
  // const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  // Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number:
  // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
  // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
  // Minimum 8 and Maximum 10 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
  // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}/;
  // this.tests.push(re.test(pw));
  //for dev.. aslong its not empty we dont' care
  this.empty();
  return this;
}
// a more flexible version that allows an array of arguments
// v = new Validation().validate("testdata", "empty", "email") -> false
Validations.prototype.validate = function (data, args) {
  this.data = data;
  Array.from(arguments).forEach((test, index) => {
    if (index > 0) {
      this[test]
    }
  });
    console.log("blahh")
    return this.check();
}
v = new Validations();
console.log(v.validate("test", "empty", "email"));
console.log(v.validate("test2", "email"));
module.exports = Validations
b = new Validations("test").email().check();
console.log(b)