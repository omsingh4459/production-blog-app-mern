const express = require('express')
const { bgRed } = require('colors')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8080
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MONGOconnect error ${error}`.bgRed.white);
    }
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
module.exports = connectDB;
