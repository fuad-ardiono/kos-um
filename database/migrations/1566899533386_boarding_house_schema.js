'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardingHouseSchema extends Schema {
  up () {
    this.table('boarding_houses', (table) => {
      // alter table
      table.text('google_maps_embed', 'longtext').notNullable().after('address')
      table.bigInteger('viewsCount').nullable().after('google_maps_embed').default(0)
    })
  }

  down () {
    this.table('boarding_houses', (table) => {
      // reverse alternations
      table.dropColumn('google_maps_embed')
      table.dropColumn('viewsCount')
    })
  }
}

module.exports = BoardingHouseSchema
