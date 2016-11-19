exports.seed = function(knex, Promise) {
  return knex('users').del()
  .then (function() {
    return Promise.all ([
      knex('users').insert({first_name: "Harry", last_name: "Potter", email: "thechosen1@hogwarts.uk", password_digest: "secure-evenutally"}),
      knex('users').insert({first_name: "Hermione", last_name: "Weasley", email: "leviOHsa@hogwarts.uk", password_digest: "secure-evenutally"}),
      knex('users').insert({first_name: "Ron", last_name: "Weasley", email: "ih8crookshanks@hogwarts.uk", password_digest: "secure-evenutally"}),
      knex('users').insert({first_name: "Draco", last_name: "Potter", email: "myfatherisgoingtohearaboutthis@hogwarts.uk", password_digest: "secure-evenutally"})
    ])
  })
}