const mongoose = require("mongoose")
require('dotenv').config()

module.exports = {

    connect: () => {
        mongoose.connect(`mongodb+srv://noamlevy81:${process.env.MONGO_PASS}@users-l70ab.mongodb.net/Sportify?retryWrites=true`, 
        { useNewUrlParser: true ,  useCreateIndex: true,})
        console.log('mongo client connected')
    }
}

