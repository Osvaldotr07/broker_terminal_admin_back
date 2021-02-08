const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const senderEmail = require('../services/email/email')

const emailSenderApi = (app) => {
    const router = express.Router()
    app.use('/email', router)

    router.post('/send', 
    passport.authenticate('jwt', {session: false}), 
    async(req, res, next) => {
        const { email } = req.body
        try {
            senderEmail(email, 'Email de prueba', 'Hello world')
            res.status(200).json({
                message: 'Email enviado'
            })
        }
        catch(err){
            console.log(err)
            next(err)
        }
    })
}

module.exports = emailSenderApi