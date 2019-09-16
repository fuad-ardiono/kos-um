'use strict'
const User = use('App/Models/User')
const { validateAll } = use('Validator')
const Hash = use('Hash')

class UserController {
    async register({request, response}) {
        const body = request.only(['name', 'username', 'password', 'email'])

        const rules = {
            email: 'required|email|unique:users',
            username: 'required|unique:users|min:4',
            name: 'required|string|min:4',
            password: 'required'
        }

        const messages = {
            "email.required": "Email wajib di isi",
            "email.email": "Email harus valid",
            "email.unique": "Email sudah terdaftar",
            "username.required": "Username wajib di isi",
            "username.unique": "Username tidak tersedia",
            "username.min": "Username minimal 4 karakter",
            "name.required": "Nama wajib di isi",
            "name.string": "Nama harus valid",
            "name.min": "Nama minimal 4 karakter",
            "password.required": "Password wajib di isi"
        }

        const validation = await validateAll(body, rules, messages)

        if (validation.fails()) {
            return response.status(422).json(validation.messages())
        }

        let user = User.create(body)

        return response.status(201).json({"messages": "User created"})
    }

    async login({request, response, auth}) {
        const body = request.only(['username', 'email', 'password'])

        const rules = {
            password: 'required',
            email: 'required_without_any:username|email',
            username: 'required_without_any:email|string'
        }

        const messages = {
            "password.required": "Password wajib di isi",
            "email.email": "Email harus valid",
            "email.required_without_any": "Email atau username harus di isi",
            "username.string": "Username harus valid",
            "username.required_without_any": "Email atau username harus di isi"
        
        }

        const validation = await validateAll(body, rules, messages)

        if(validation.fails()){
            return response.status(422).json(validation.messages())
        }
        
            try {
                const uid = request.input('email') ? body.email : body.username

                if(request.input('email')){
                    const user = await auth.attempt(uid, body.password)
                    return response.status(200).json({"messages": "Login success", "loggedIn": 1, "user": user})
                }

                if(request.input('username')){
                    const userRecord = await User.query().where('username', body.username).first()
                    
                    if(userRecord){
                        const isValid = await Hash.verify(body.password, userRecord.password)

                        if(isValid){
                            const user = await auth.loginViaId(userRecord.id)
                            return response.status(200).json({"messages": "Login success", "loggedIn": 1, "user": user})
                        }
                    }

                }
            } catch (e) {
                try {
                    const user = await auth.check()
                } catch {
                    return response.status(400).json({"messages": "Email atau username dan atau password salah", "loggedIn": 0})
                }
                
                return response.status(200).json({"messages": "User telah login", "loggedIn": 1, "user": await auth.getUser()})                
            }
    }

    async logout({response, auth}) {
        try {
            const user = await auth.check()
        } catch {
            return response.status(400).json({"messages": "User tidak sedang login", "loggedIn": 0})
        }

        const user = await auth.logout()
        return response.status(200).json({"messages": "Logout berhasil", "loggedIn": 0})
    }

    async check({response, auth}) {
        try {
            const authenticated = await auth.check()

            if(authenticated === true){
                const user = await auth.getUser()

                return response.status(200).json({"messages": "User sedang login", "loggedIn": 1, user: user})                
            }
          } catch (error) {
            return response.status(401).json({"messages": "User tidak sedang login", "loggedIn": 0})  
          }
    }
}

module.exports = UserController