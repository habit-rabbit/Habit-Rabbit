exports.seed = function(knex, Promise) {
  return knex('goals').del()
  .then (function() {
    return Promise.all ([
      knex('goals').insert({name: "Quit Smoking", private: false, user_id: 1}),
      knex('goals').insert({name: "Run a 5k", private: false, user_id: 2}),
      knex('goals').insert({name: "Beat Super Mario 64 in one day", private: false, user_id: 1}),
      knex('goals').insert({name: "Crush Super Mario 64", private: false, user_id: 3}),
      knex('goals').insert({name: "Stop crying in public", private: true, user_id: 4}),
      knex('goals').insert({name: "Quit Smoking", private: false, user_id: 3}),
      knex('goals').insert({name: "Run a 5k", private: false, user_id: 4})
    ])
  })
}