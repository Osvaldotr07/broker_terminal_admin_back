const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const {config} = require('../../../config/index')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const UsersService = require('../../../services/users')

passport.use(new BasicStrategy(async function(email, password, cb) {
    let isAdmin = false
    const usersService = new UsersService()
    try {
        
        let adminAllowed = config.users_allowed_to_admin.split(',')
        console.log(adminAllowed)
        adminAllowed.forEach(item => {
            console.log(item)
            console.log(email)
            if(item == email){
                isAdmin= true
            }
        })
        const user = await usersService.getUser({ email })

        if(!user){
            return cb(boom.unauthorized('Usuario no autorizado'), false)
        }
        if(!isAdmin){
            return cb(boom.unauthorized('Usuario no administrador'), false)
        }
        if(!(await bcrypt.compare(password, user.password))){
            return cb(boom.unauthorized('Contraseña Incorrecta'), false)
        }

        delete user.password

        return cb(null, user)
    }
    catch(err){
        return cb(err)
    }
}))