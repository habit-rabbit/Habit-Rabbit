exports.seed = function(knex, Promise) {
  return knex('tasks').del()
  .then (function() {
    return Promise.all ([
      knex('tasks').insert({goal_id: 5, task_order: 1, is_done: false, name: "Day1: Only cry twice"}),
      knex('tasks').insert({goal_id: 5, task_order: 2, is_done: false, name: "Day2: Only cry once"}),
      knex('tasks').insert({goal_id: 5, task_order: 3, is_done: false, name: "Day3: Only cry at home"}),
      knex('tasks').insert({goal_id: 5, task_order: 4, is_done: false, name: "Day4: Only cry ONCE at home"}),
      knex('tasks').insert({goal_id: 5, task_order: 5, is_done: false, name: "Day5: No crying at all"}),

      knex('tasks').insert({goal_id: 1, task_order: 1, is_done: false, name: "Buy Nicorette"}),
      knex('tasks').insert({goal_id: 1, task_order: 2, is_done: false, name: "Surive on 1 cigarette / day + Nicorette"}),
      knex('tasks').insert({goal_id: 1, task_order: 3, is_done: false, name: "Go for 1 month only on Nicorette"}),
      knex('tasks').insert({goal_id: 1, task_order: 3, is_done: false, name: "Go for 1 month without cigarettes or Nicorette"}),

      knex('tasks').insert({goal_id: 6, task_order: 1, is_done: false, name: "Throw out cigarettes"}),
      knex('tasks').insert({goal_id: 6, task_order: 2, is_done: false, name: "Eat a breathmint whenever I crave a cigarette"}),
      knex('tasks').insert({goal_id: 6, task_order: 3, is_done: false, name: "Go for 1 month with no cigarettes"}),

      knex('tasks').insert({goal_id: 2, task_order: 1, is_done: false, name: "Run 1km/day for a week"}),
      knex('tasks').insert({goal_id: 2, task_order: 2, is_done: false, name: "Run 2km/day for a week"}),
      knex('tasks').insert({goal_id: 2, task_order: 3, is_done: false, name: "Run 3km/day for a week"}),
      knex('tasks').insert({goal_id: 2, task_order: 4, is_done: false, name: "Run 4km/day for a week"}),

      knex('tasks').insert({goal_id: 7, task_order: 3, is_done: false, name: "Make Harry piggyback me the whole way"}),
      knex('tasks').insert({goal_id: 7, task_order: 2, is_done: false, name: "Run around 2 blocks"}),
      knex('tasks').insert({goal_id: 7, task_order: 1, is_done: false, name: "Run around 1 block"}),

      knex('tasks').insert({goal_id: 3, task_order: 1, is_done: false, name: "Sit in front of the telly and stay there until I win the game"}),
      knex('tasks').insert({goal_id: 4, task_order: 1, is_done: false, name: "Break Harry's N64"}),
      knex('tasks').insert({goal_id: 4, task_order: 2, is_done: false, name: "Beat the game in time for dinner"}),
    ])
  })
}