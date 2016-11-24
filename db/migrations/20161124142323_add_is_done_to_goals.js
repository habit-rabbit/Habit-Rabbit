exports.up = function(knex, Promise) {
  return knex.schema.table('goals', function (table) {
    table.boolean('is_done').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('goals');
};