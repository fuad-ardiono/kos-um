'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

const Url = require('url-parse')
const DATABASE_URL = new Url('postgres://zvvopibsigalmr:10d352f9b68aa71172601dce88fbfa45cda91ecd22603487ef6bbd8cbd9e5641@ec2-174-129-227-128.compute-1.amazonaws.com:5432/ddktp2fo35kmmf')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'pg'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be good choice under development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis')
    }
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: 'ec2-174-129-227-128.compute-1.amazonaws.com',
      port: '5432',
      user: 'zvvopibsigalmr',
      password: '10d352f9b68aa71172601dce88fbfa45cda91ecd22603487ef6bbd8cbd9e5641',
      database: 'ddktp2fo35kmmf',
      ssl: 'true'
    }
  }
}
