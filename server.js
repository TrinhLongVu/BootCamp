const app = require('./src/app')
const config = require('./src/configs/mongodb.config')
const PORT = config.app.port || 3001;

const server = app.listen(PORT, () => {
    console.log(`start project....${PORT}`)
})
