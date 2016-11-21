function ResponseData(error, data) {
  this.data = {};
  this.error = {};
}

ResponseData.prototype.setErrorMsg = function(msg) {
  this.error.msg = msg;
}

ResponseData.prototype.getErrorMsg = function() {
  return this.error.msg;
}

ResponseData.prototype.setData = function(dataObject) {
  this.data = dataObject;
}

ResponseData.prototype.getData = function() {
  return this.data;
}

module.exports = ResponseData;