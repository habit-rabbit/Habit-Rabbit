exports.up = function(knex, Promise) {
  return knex.schema.createTable('goals', function (table) {
    table.increments();
    table.string('name');
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.integer('challenge_id').references('id').inTable('challenges');
    table.boolean('private').notNullable();
    table.date('deadline');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('goals');
};