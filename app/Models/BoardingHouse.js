'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BoardingHouse extends Model {
    static get table () {
        return 'boarding_houses'
      }
}

module.exports = BoardingHouse
