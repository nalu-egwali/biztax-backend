
//entry point of the app


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();


//import the routes
const userRoutes = require('./routes/userRoutes');
//const taxRoutes = require('./routes/taxRoutes');

//const companyRoutes = require("./routes/companyRoutes");

//configure cors
app.use(cors());

//
const db = require('./db');


// configure dotenv for environment variable
dotenv.config();

//connect database
db();

//body-parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//mounting
app.get("/", (req, res) => {
    res.status(200).json({msg: "Hello Delta Emmi"})
})

app.use("/api/v1/user", userRoutes)
//app.use("/api/v1/task", taxRoutes)
//app.use("/api/v1/company", companyRoutes)

const port = process.env.PORT
app.listen(port, () => console.log("server running"));