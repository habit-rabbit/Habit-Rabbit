exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('badges');
  return knex.schema.createTable('badges', function (table) {
    table.increments();
    table.string('name');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('badges');
};