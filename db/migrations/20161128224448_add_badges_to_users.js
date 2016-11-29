exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.integer('badges').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};