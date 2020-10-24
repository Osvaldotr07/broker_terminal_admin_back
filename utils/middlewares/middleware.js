const authenticated = (req, res, next) => {
    req.session.originalUrl = req.originalUrl
    if(req.user) {
        jwt.verify(req.user.jwt, 'broker', (err, encoded) => {
            if(err) {
                res.redirect('/login/login')
            }
            else {
                next()
            }
        })
    }
    else {
        res.redirect('/login/login')
    }
}

module.exports = { authenticated }