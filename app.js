const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const bodyParse = require('body-parser');
const debug = require('debug')('app:server');
const { config } = require('./config');
const helmet = require('helmet');
const oidc = require('./InitializerLogin/oidc');
const fs = require('fs')
const https = require('https')
const cookieParser = require('cookie-parser');

//routes
const authApi = require('./routes/basicAuth')

app.use(express.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser())

authApi(app)

// app.use(
//     session({
//         secret: 'brokerwebapp',
//         resave: true,
//         saveUninitialized: true,
//         proxy: true,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, cb) {
//     console.log(user);
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });

// oidc(passport);

// app.use('/login', authApi());

if (!config.local) {
    https.createServer({
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    }, app).listen(config.port);
    console.log(`Conectado en https://localhost:${config.port}`);
}
else {
    app.listen(config.port, () => {
        console.log(`Conectado en http://localhost:${config.port}`);
    });
}
