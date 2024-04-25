const dev = {
    app: {
        port: process.env.DEV_APP_PORT
    },
    db: {
        password: process.env.DEV_DB_PASSWORD,
        name: process.env.DEV_DB_NAME
    }
}

const product = {
    app: {
        port: process.env.PRO_APP_PORT
    },
    db: {
        password: process.env.PRO_DB_PASSWORD,
        name: process.env.PRO_DB_NAME
    }
}

const config = { dev, product }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]