//================validation class================
// A utility to chain validations for given data and returns a boolean
// for the cumulative result of each validation
//
// how to use:
// create new instance of Validations with your data as an argument
//
// v = new Validations("test");
// from here there are a few methods at your disposal...
// v.empty().check() -> checks if argument is not an empty string
// v.number().check() -> checks if argument is an integer
// v.email().check() -> checks if argument is an email address
//
// =======where the magic happens is that you can chain these=======
//  eg: my data is an email address : "test@test.com"
//
// var valid = new Validation("test@test.com")
// .empty()
// .email()
// .check()
//    ...will return a boolean whether or not it passed each validation!
//================update===========================
// You can now instantiate a validation call with either an array or comma seperated arguments
//
// var v = new Validation("test@test.com")
//      .validate("empty", "email").check() ~~> returns boolean
// OR
// var v = new Validation("test@test.com")
//      .validate(["empty", "email"]).check() ~~> returns boolean
//
// OR you can input an object and the class will iterate over each key and test it for appropriate validations
// related to that key.
// var v = new Validation({first_name: "tod",
//       "last_name": bob,
//       "extraname" : "bobby",
//       "email" : "bobbybab@gmail.com"
//      }).check() ~~~~> returns boolean

const db = require("../query_class.js");

function Validations(data) {
  this.tests = [];
  this.data = data;
  this.fields = ["name", "email", "password"];
  if (typeof data === "object") {
    if (data.password && data.password_confirmation) {
      this.isEqual(data.password, data.password_confirmation)
    };
    this.validateObj(this.data);
  };
}
//used only when object is used as argument for new Validations()
Validations.prototype.validateObj = function(object) {
  const keyArr = Object.keys(object);
  this.fields.forEach((elm) => {
    let re = new RegExp(elm);
    keyArr.forEach((keys) => {
      if (re.test(keys)) {
        this.data = object[keys];
        this.mustTest(elm);
      };
    })
  });
}
// called by validateObj
Validations.prototype.mustTest = function(field) {
  switch (field) {
    case "name":
      this.validate("empty");
      break;
    case "email":
      this.validate("empty", "email");
      break;
    case "password":
      this.validate("empty", "password");
      break;
    default:
      return;
  };
}
// called at the end of method chain to return result of test
Validations.prototype.check = function() {
  let result = this.tests.every(function(elm) {
    return elm == true;
  });
  return result;
}
Validations.prototype.isEqual = function(arg1, arg2) {
  this.tests.push(arg1 === arg2);
  return this;
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
//this shouldn't be necessary if a constraint is added to database migrations
// Validations.prototype.unique = function(table, column) {
//   //** need to switch query to find First record where query matches instead of db.getAll

//   const query = {};
//   query.table = table;
//   //query database for the table
//   db.getAll(query, (err, res) => {
//     //get all results and check this.data against column in table
//    let result = res.every((elm) => {
//       return elm[column] !== this.data;
//     });
//    this.tests.push(result);
//   });
//   return this;
// }

Validations.prototype.password = function() {
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
  this.empty();
  return this;
}
// a more flexible version that allows an array of arguments
// v = new Validation(data).validate( "empty", "email").check() -> false
Validations.prototype.validate = function (args) {
  // if args is an array, it is not mutated
  // if args are comma seperated, it is turned into an array
  const argsArr = (args instanceof Array) ? args : Array.from(arguments);
  argsArr.forEach((elm, index) => {
    this[elm]();
  });
  return this;
}

module.exports = Validations
