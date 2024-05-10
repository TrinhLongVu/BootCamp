const dev = {
    app: {
        port: process.env.DEV_MYSQL_APP_PORT
    },
    db: {
        password: process.env.DEV_MYSQL_DB_PASSWORD,
        name: process.env.DEV_MYSQL_DB_NAME,
        host: process.env.DEV_MYSQL_DB_HOST,
        port: process.env.DEV_MYSQL_DB_PORT,
        user: process.env.DEV_MYSQL_DB_USER,
    }
}

const product = {
    app: {
        port: process.env.PRO_MYSQL_APP_PORT
    },
    db: {
        password: process.env.PRO_MYSQL_DB_PASSWORD,
        name: process.env.PRO_MYSQL_DB_NAME
    }
}

const config = { dev, product }
const env = process.env.NODE_ENV || 'dev'

module.exports = config[env]