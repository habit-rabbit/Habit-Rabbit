const tables = ["users", "tasks", "goals", "challenges", "daily_goals"];
//finds the table that is required for a database query
//based on the restful route that calls this function;
function findTable(url) {
  //split the url by its forward slashes and store in array
  const array = url.split("/")
  let possibilities = array.filter( (elm) => {
    for(table of tables) {
      if (table === elm) return elm;
    }
  });
  //returns the last possiabaity as it is more then likely the desired table
  //in most cases
  return possibilities[possibilities.length -1];
}

module.exports = findTable;