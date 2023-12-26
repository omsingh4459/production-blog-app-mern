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
const corsOptions = {
  origin:"https://good-plum-meerkat-coat.cyclic.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};


app.use(cors(corsOptions));
// app.use(cors())
app.use(express.json())//parse data to json formta sent by client
app.use(morgan('dev')) //show url which will be hit by consolw

//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes);


//static files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
app.options("*", (req, res) => {
  console.log("preflight");
  if (
    req.headers.origin === "https://badmintown.onrender.com" &&
    allowMethods.includes(req.headers["access-control-request-method"]) &&
    allowHeaders.includes(req.headers["access-control-request-headers"])
  ) {
    console.log("pass");
    return res.status(204).send();
  } else {
    console.log("fail");
  }
  });
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://good-plum-meerkat-coat.cyclic.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL+';')
        console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`MONGOconnect error ${error}`.bgRed.white);
    }
}


//listen
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${process.env.DEV_MODE} port no. ${PORT}`.bgCyan.white);
    })
})
