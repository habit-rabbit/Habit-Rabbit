exports.up = function(knex, Promise) {
  return knex.schema.createTable('challenges', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.date('deadline');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('challenges');
};