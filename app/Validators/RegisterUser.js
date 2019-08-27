'use strict'

class RegisterUser {
  get rules () {
    return {
      email: 'required|email|unique:users',
      username: 'required',
      name: 'required|string|alpha',
      password: 'required'
    }
  }
}

module.exports = RegisterUser
