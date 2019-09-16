'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
  
//API

Route.group(() => {
    Route.post('register', 'UserController.register')
    Route.post('login', 'UserController.login')
    Route.post('logout', 'UserController.logout')
    Route.get('auth/check', 'UserController.check')
    Route.resource('boarding-house', 'BoardingHouseController').only(['index', 'show'])
}).prefix('/api/v1')

Route.group((group) => {
    Route.resource('boarding-house', 'BoardingHouseController')
        .only(['store', 'update', 'destroy'])
    Route.post('boarding-house/image', 'BoardingHouseController.handleFileUpload')
}).prefix('api/v1').middleware('auth')

//WEB
Route.any('*', ({view}) =>  view.render('app'))


