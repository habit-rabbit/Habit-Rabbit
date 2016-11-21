function Validations(data) {
  this.tests = [];
  this.data = data;
  // methods

  this.isNotEmpty = function() {
    let string = this.data.trim();
    return string.length > 0;
  }
  this.isNumber = function() {
    return Number.isInteger(this.data);
  }
}
var v = new Validations();

Validations.prototype.validatesEmpty = function(string) {
  this.tests.push(this.isNotEmpty(string));
  return this;
}

Validations.prototype.validatesNumber = function() {
  this.tests.push(this.isNumber);
}

Validations.prototype.check = function() {
  this.tests.forEach((element) => {
    if(element() === false) return false;
  });
  return true;
}

console.log(v.isNotEmpty(""))