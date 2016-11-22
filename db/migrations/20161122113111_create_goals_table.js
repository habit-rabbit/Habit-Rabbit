exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('goals');
  return knex.schema.createTable('goals', function (table) {
    table.increments();
    table.string('name');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.boolean('private').notNullable();
    table.date('deadline');
    table.timestamp('created_at').defaultTo(knex.fn.now())
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('goals');
};