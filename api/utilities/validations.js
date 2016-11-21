function Validations() {
  this.tests = [];

  function isNotEmpty(string) {
    string = string.trim();
    string.length > 0 ? return true: return false;
  }
}