'use strict'

const Database = use('Database')
const BoardingHouse = use('App/Models/BoardingHouse')
const { validateAll } = use('Validator')
const Helpers = use('Helpers')

const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'dgs0l7xvs',
  api_key: '784528876854189',
  api_secret: 'U7D-FR2dmOY3eDDua0qw6KYfuXg'
});

class BoardingHouseController {

    constructor(){

    }

    async index({params, response, request}){
        const queryParams = request.get()

        const queryBoarding = Database.table('boarding_houses')

        if(queryParams.hasOwnProperty('area')){
            queryBoarding.where('address', queryParams.area)
        }

        if(queryParams.hasOwnProperty('recomended')){
            if(queryParams.recomended === 'true'){
                queryBoarding.orderBy('viewsCount', 'desc').limit(6)
            }
        }

        if(queryParams.hasOwnProperty('search')){
            queryBoarding.where('name', queryParams.search)
        }

        await queryBoarding.then((data) => {
            return response.json(data)
        })
        // return response.status(200).json(queryBoarding)
    }

    async store({request, response}){
        const body = request.only(['name','address', 'google_maps_embed', 'image'])

        const rules = {
            name: "required|string|min:4",
            address: "required|string|min:10",
            google_maps_embed: "required|string|min:30|includes:maps.google.com,iframe,div",
            image: "required|string"
        }

        const messages = {
            "name.required": "Nama kost wajib di isi",
            "name.string": "Nama kost harus valid",
            "name.min": "Nama kost harus valid, minimal 4 karakter",
            "address.required": "Alamat kost wajib di isi",
            "address.string": "Alamat kost harus valid",
            "address.min": "Alamat kost harus valid, minimal 4 karakter",
            "google_maps_embed.required": "Google maps embed wajib di isi",
            "google_maps_embed.string": "Google maps embed harus valid",
            "google_maps_embed.min": "Google maps embed harus valid, minimal 30 karakter",
            "google_maps_embed.includes": "Format maps embed harus valid",
            "image.required": "Gambar wajib di isi",
            "image.string": "Gambar harus valid"
        }

        const validation = await validateAll(body, rules, messages)

        if(validation.fails()){
            return response.status(422).json(validation.messages())
        }

        try {
            const boardingHouse = BoardingHouse.create(body)

            return response.status(201).json({"messages":"Boarding house created"})
        } catch(e) {
            return response.status(400).json({"messages":"Boarding house fail to create"})
        }
    }

    async show({params, response}){
        const boardingHouse = await BoardingHouse.find(params.id)

        if(boardingHouse){
            return response.status(200).json(boardingHouse)
        } else {
            return response.status(404).json({'messages': 'No boarding house data'})
        }
    }

    async update({params, response, request}){
        const body = request.only(['name','address', 'google_maps_embed', 'image'])

        const rules = {
            name: "required|string|min:4",
            address: "required|string|min:10",
            google_maps_embed: "required|string|min:30|includes:maps.google.com,iframe,div",
            image: "string"
        }

        const messages = {
            "name.required": "Nama kost wajib di isi",
            "name.string": "Nama kost harus valid",
            "name.min": "Nama kost harus valid, minimal 4 karakter",
            "address.required": "Alamat kost wajib di isi",
            "address.string": "Alamat kost harus valid",
            "address.min": "Alamat kost harus valid, minimal 4 karakter",
            "google_maps_embed.required": "Google maps embed wajib di isi",
            "google_maps_embed.string": "Google maps embed harus valid",
            "google_maps_embed.min": "Google maps embed harus valid, minimal 30 karakter",
            "google_maps_embed.includes": "Format maps embed harus valid",
            "image.string": "Gambar harus valid"
        }

        const validation = await validateAll(body, rules, messages)

        if(validation.fails()){
            return response.status(422).json(validation.messages())
        }

        try {
            await BoardingHouse.query().where('id', params.id).update(body)

            return response.status(200).json({"messages": "Boarding house updated"})
        } catch(e) {
            console.log(e);
            return response.status(400).json({"messages": "Boarding house data gagal di update"})
        }
    }

    async destroy({params, response}){
        const boardingHouse = await BoardingHouse.find(params.id)

        if(boardingHouse){
            await boardingHouse.delete()
        } else {
            return response.status(404).json({"messages": "No boarding house data"})
        }
    }

    async handleFileUpload({ request, response }){
        const boardingHouseImg = request.file('boarding_house_img', {
            types: ['image'],
            size: '10mb'
          });

          const cloudinaryResponse = await cloudinary.v2.uploader.upload(boardingHouseImg.tmpPath, {folder: 'kosum'});

          // let date = new Date()
          // let day = date.getDate().toString()
          // let month = date.getMonth().toString()
          // let year = date.getFullYear().toString()
          // let hours = date.getHours().toString()
          // let minutes = date.getMinutes().toString()
          // let second =  date.getSeconds().toString()
          //
          // let name = `${day}-${month}-${year}-${hours}:${minutes}:${second}.${boardingHouseImg.subtype}`
          // await boardingHouseImg.move(Helpers.publicPath('/img/boarding-house'), {
          //   name: name,
          //   overwrite: true
          // })
          //
          // if (!boardingHouseImg.moved()) {
          //   return response.status(400).json(await boardingHouseImg.error())
          // }

          return response.status(200).json({"path": `${cloudinaryResponse.secure_url}`})
    }
}

module.exports = BoardingHouseController
