exports.up = function(knex, Promise) {
  return knex.schema.createTable('challenges', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.date('deadline');
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('challenges');
};