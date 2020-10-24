require('dotenv').config()

const config = {
    port: process.env.PORT || 3000,
    client_id: "MWVjNzc1NWMtMWNlYS00",
    client_secret: "NTc5MjJmNmItYWI2NC00",
    redirect_uri: 'https://localhost:3000/login/auth/sso/callback',
    hostname: 'prepiam.ice.ibmcloud.com',
    local: true,
    dev: process.env.NODE_ENV !== 'production',
    cors: process.env.CORS,
    dbUser: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
    
}

module.exports = { config }