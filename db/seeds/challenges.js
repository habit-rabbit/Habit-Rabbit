exports.seed = function(knex, Promise) {
  return knex('challenges').del()
  .then (function() {
    return Promise.all ([
      knex('challenges').insert({name: "Quit Smoking", deadline: '11/28/2016'}),
      knex('challenges').insert({name: "Run a 5k", deadline: '11/28/2016'}),
      knex('challenges').insert({name: "Beat Super Mario 64 in one day", deadline: '11/28/2016'})
    ])
  })
}