exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', function (table) {
    table.increments();
    table.integer('goal_id').references('id').inTable('goals').notNullable();
    table.integer('task_order').notNullable();
    table.string('name').notNullable();
    table.boolean('is_done').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};