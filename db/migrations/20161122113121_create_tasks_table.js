exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('tasks');
  return knex.schema.createTable('tasks', function (table) {
    table.increments();
    table.integer('goal_id').references('id').inTable('goals').onDelete('CASCADE');
    table.integer('task_order').notNullable();
    table.string('name').notNullable();
    table.boolean('is_done').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks');
};