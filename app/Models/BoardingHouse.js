'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const sanitizeHtml = require('sanitize-html')

class BoardingHouse extends Model {
    static get table () {
        return 'boarding_houses'
    }

    static boot () {
      super.boot()
  
      /**
       * A hook to clean unnecessary tags html
       * it to the database.
       */
      this.addHook('beforeSave', async (boardingHouseInstance) => {
        if (boardingHouseInstance.google_maps_embed) {
          const dirty = boardingHouseInstance.google_maps_embed
          const cleanContent = await sanitizeHtml(dirty, {
            allowedTags: ['div', 'iframe'],
            allowedAttributes: {
              'div': ['class', 'id'],
              'iframe': ['width', 'height', 'id', 'src', 'frameborder', 'scrolling', 'marginheight', 'marginwidth']
            },
            allowedClasses: {
              'div': ['mapouter', 'gmap_canvas']
            },
            transformTags: {
              'style': (tagName, attribs) => {
                return {
                  tagName: 'style',
                  text: ''
                }
              }
            }
          })
          boardingHouseInstance.google_maps_embed = cleanContent
        }
      })
    }
}

module.exports = BoardingHouse
