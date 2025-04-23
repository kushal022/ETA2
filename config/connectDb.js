const mongoose = require('mongoose');
const colors = require('colors');

 
const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb connected ✔✔ and server Running on ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        console.log(`MongoDB is not Connected ❌❌ ${error}`.bgRed)
    }
}

module.exports = connectDb;