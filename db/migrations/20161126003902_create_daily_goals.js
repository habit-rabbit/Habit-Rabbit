exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('daily_goals');
  return knex.schema.createTable('daily_goals', function (table) {
    table.increments();
    table.string('name');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.boolean('is_done').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('daily_goals');
};