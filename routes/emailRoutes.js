const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const senderEmail = require('../services/email/email')
let adminEmails = process.env.adminEmail.split(',')
const emailSenderApi = (app) => {
    const router = express.Router()
    app.use('/email', router)

    router.get('/send', 
    async(req, res, next) => {
        try {
            adminEmails.forEach(email => {
                senderEmail(email, 'Un nuevo usuario ha envido el formulario', 'Hola administrador, tienes en bandeja del sistema de administración un nuevo formulario para revisar')
            })
            
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