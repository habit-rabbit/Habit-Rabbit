const db = require('../query_class.js');

function Validations(data) {
  this.tests = [];
  this.data = data;
  this.isNumber = function() {
    return Number.isInteger(this.data);
  }
}

Validations.prototype.validatesEmpty = function() {
  let string = this.data.trim();
  this.tests.push(string.length > 0);
  return this;
}

Validations.prototype.validatesNumber = function() {
  this.tests.push(Number.isInteger(this.data));
  return this;
}
Validations.prototype.validatesEmail = function() {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = this.data.toLowerCase();
  this.tests.push(re.test(email));
  return this;
}
Validations.prototype.validatesUnique = function(column, table) {
  const query = {};
  const query.table = table;

  db.getAll(query, (err, data) => {
    data.forEach((elm) => {
      console.log(elm, "yay");
    })
  });
}
Validations.prototype.check = function() {
  let result = this.tests.every(function(elm) {
    return elm == true;
  })
  return result;
}
var v = new Validations(13);
var t = new Validations("");
console.log(v.validatesNumber().check());
console.log(t.validatesNumber().validatesEmpty().check());

