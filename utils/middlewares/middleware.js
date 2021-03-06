
const { config } = require('../../config')
const jwt = require('jsonwebtoken')

function authenticated(req, res, next){
    console.log('Hello',req.body)
    next()
    // if(req.user) {
    //     jwt.verify(req.user.jwt, config.authJwtSecret, (err, encoded) => {
    //         if(err) {
    //             res.redirect('/sign-in')
    //         }
    //         else {
    //             next()
    //         }
    //     })
    // }
    // else {
    //     res.redirect('/sign-in')
    // }
}

module.exports =  authenticated 