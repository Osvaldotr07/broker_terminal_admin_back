const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { config } = require('../config')
const { ENV } = process.env
const ApiKeysService = require('../services/apiKeys')
const { createUserSchema, createProviderUserSchema } = require('../utils/schemas/users')
const UserService = require('../services/users')

//basic strategy
require('../utils/auth/strategies/basic')
function authApi(app){
   
    const router = express.Router()
    app.use('/api/auth/', router)

    const apiKeysService = new ApiKeysService()
    const usersService = new UserService()

    router.post('/sign-in', async(req, res, next) => {
        passport.authenticate('basic', function(error, user){
            console.log("user basic",user)
            try{
                if(error || !user){
                    next(boom.unauthorized())
                }

                req.login(user, { session: false }, async function(error){
                    if(error){
                        next(error)
                    }

                    // const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

                    // if(!apiKey){
                    //     next(boom.unauthorized())
                    // }

                    const {_id: id, name, email } = user

                    const payload = {
                        sub: id,
                        name, 
                        email,
                        // scopes: apiKey.scope
                    }

                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '15m'
                    })
                    res.cookie('token', token, {
                        httpOnly: !(ENV === 'development'),
                        secure: !(ENV === 'development'),
                      });
                    return res.status(200).json({
                        token,
                        user: { id, name, email }
                    })
                    
                })
            }
            catch(err){
                next(err)
            }
        })(req, res, next)
    })

    router.post('/sign-up', async(req, res, next) => {
        const { body: user } = req
        try{
            const createUserId = await usersService.createUser({ user })
            console.log(createUserId)
            res.status(201).json({
                data: createUserId,
                message: 'user created'
            })
        }
        catch(err){
            console.log('error', err)
        }
    })

    router.post('/sign-provider', async function(req, res,next) {
        const { body } = req

        const { apiKeyToken, ...user } = body

        if(!apiKeyToken){
            next(boom.unauthorized('apiKeyToken is required'))
        }

        try{
            const queryUser = await usersService.getOrCreateUser({ user })
            const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken })

            if(!apiKey){
                next(boom.unauthorized())
            }

            const { _id: id, name, email } = queryUser

            const payload = {
                sub: id,
                email,
                name, 
                scopes: apiKey.scope
            }

            const token = jwt.sign(payload, config.authJwtSecret, {
                expiresIn: '15m'
            })

            return res.status(200).json({token, user: {id, name, email}})
        }
        catch(err){

        }
    })
}

module.exports = authApi