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
const cors = require('cors')


//routes
const authApi = require('./routes/basicAuth')
const formApi = require('./routes/forms')
const emailApi = require('./routes/emailRoutes')
const usersApi = require('./routes/users')

app.use(cors())
app.options('*', cors());
app.use(express.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser())

authApi(app)
formApi(app)
emailApi(app)
usersApi(app)

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
