const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors')
const dotenv = require('dotenv')
const path = require("path");
// const connectDB = require('./config/db')

const mongoose = require('mongoose')
//env config
dotenv.config()

//router import
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
//mongodb connection
// connectDB();

//rest object
const app = express();
const PORT = process.env.PORT || 8080
//midllewares

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL+';')
        console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MONGOconnect error ${error}`.bgRed.white);
    }
}



// app.use(cors())
const corsOptions = {
  origin: 'https://good-plum-meerkat-coat.cyclic.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json())//parse data to json formta sent by client

app.use(morgan('dev')) //show url which will be hit by consolw
//routes
app.use('/api/v1/user', cors(corsOptions)); 
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', cors(corsOptions)); 
app.use('/api/v1/blog', blogRoutes);


//static files
app.use(express.static(path.join(__dirname, "./client")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client"));
});





//listen
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${process.env.DEV_MODE} port no. ${PORT}`.bgCyan.white);
    })
})
