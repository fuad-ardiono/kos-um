'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardingHouseSchema extends Schema {
  up () {
    this.create('boarding_houses', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('address').notNullable()
      table.text('image').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('boarding_houses')
  }
}

module.exports = BoardingHouseSchema
