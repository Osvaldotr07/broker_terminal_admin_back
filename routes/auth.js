const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const aunthenticated = require('../utils/middlewares/middleware')

const authApi = () => {
    router.get(
        '/login',
        passport.authenticate('oidc', {
            state: Math.random().toString(36).substr(2, 10)
        })
    )

    router.get('/auth/sso/callback', (req, res, next) => {
        let redirect_url = req.session.originalUrl
        console.log(redirect_url)
        passport.authenticate('oidc', {
            seccessRedirect: redirect_url,
            failureRedirect: '/failure'
        })(req, res, next)
    })

    router.get('/',(req, res) => {
        var requestUrl = req.query.fromUrl
        req.session.originalUrl = requestUrl
        res.redirect('/login/login')
    })


    router .get('/validateLogin', (req, res) => {
        if(req.user){
            jwt.verify(req.user.jwt, 'broker', (err, decoded) => {
                if(err) {
                    res.status(403).json({isLogged: false, message: 'user is not correct'})
                }
                else {
                    res.status(201).json({ isLogged: true, message: 'user is correct'})
                }
            })
        }
        else {
            res.status(403).json({isLogged: false, message: 'user is not correct'})
        }
    })
    return router
}

module.exports = authApi