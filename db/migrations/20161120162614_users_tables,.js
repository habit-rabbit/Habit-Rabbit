exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};