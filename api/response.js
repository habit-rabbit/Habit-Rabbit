function Response(error, data) {
  this.data = {};
  this.error = {};
}

Response.prototype.setErrorMsg = function(msg) {
  this.error.msg = msg;
}

Response.prototype.getErrorMsg = function() {
  return this.error.msg;
}

Response.prototype.setData = function(dataObject) {
  this.data = dataObject;
}

Response.prototype.getData = function() {
  return this.data;
}

module.exports = Response;