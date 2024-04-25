const mongoose = require('mongoose')
const config = require('../configs/mongodb.config')
//const string_mongodb = `mongodb+srv://Ecommerce:${config.db.password}@cluster0.iwaphxz.mongodb.net/${config.db.name}?retryWrites=true&w=majority&appName=Cluster0`

class Database {
    constructor() {
        this.#connect();
    }

    #connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set("debug", true)
            mongoose.set("debug", {
                color: true
            })
        }

        mongoose.connect(string_mongodb, {
                maxPoolSize: 50
            }, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => console.log('Connected!'))
            .catch(error => console.error('Connection error:', error));
    }

    static getInstance() {
        if (!Database._instance) {
            Database._instance = new Database();
        }
        return Database._instance;
    }
}

const instanceMongoDb = Database.getInstance()

module.exports = instanceMongoDb