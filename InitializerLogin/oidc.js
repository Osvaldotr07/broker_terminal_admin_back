const jwt = require('jsonwebtoken')
const { Strategy, Issuer } = require('openid-client')
const passport = require('passport')
const { config } = require('../config')


Issuer.defaultHttpOptions = { timeout: 20000 }


const oidc = (passport) => {
    Issuer.discover(
        `https://${config.hostname}/oidc/endpoint/default/.well-known/openid-configuration`
    )
    .then((ibmIssuer) => {
        let client = new ibmIssuer.Client({
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uris: [config.redirect_uri]
        })
        client.CLOCK_TOLERANCE = 30

        let params = {}

        passport.use(
            'oidc',
            new Strategy({client, params}, (tokenset, userinfo, done) => {
                let profile = {
                    ...tokenset,
                    ...userinfo
                }
                profile.jwt = jwt.sign(userinfo, 'Broker', {
                    expiresIn: '15m'
                })

                return done(null, profile)
            })
        )
    })
}

module.exports = oidc