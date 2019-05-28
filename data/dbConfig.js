const knex = require('knex')
const configOptions = require('../knexfile')

const db = knex(configOptions.development)

module.exports = db

