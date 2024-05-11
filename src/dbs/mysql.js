const mysql = require('mysql2')
const config = require('../configs/mysql.config')

class Database {
    constructor() {
        this.connection = this.#connect();
    }

    #connect() {
        const connection = mysql.createConnection({
            host: config.db.host,
            user: config.db.user,
            password: config.db.password,
            database: config.db.name,
            port: config.db.port
        });

        connection.connect(err => {
            if (err) {
                console.error('Error connecting to the database:', err);
                return;
            }
            console.log('Database connected successfully!');
        });

        return connection;
    }

    static getInstance() {
        if (!Database._instance) {
            Database._instance = new Database();
        }
        return Database._instance;
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

const instanceMySQL = Database.getInstance();

module.exports = instanceMySQL;
