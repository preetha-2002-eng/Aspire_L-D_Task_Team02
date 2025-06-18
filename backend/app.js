var mongoose = require('mongoose');
const dotenv = require("dotenv");
// mongoose.connect("mongodb://localhost:27017/test");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
var userRoutes = require('./routes/userRoute');
app.use('/', userRoutes);
mongoose.connect(MONGO_URL).then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`server is running on the port ${PORT}`);
    })
}).catch((error) => console.log(error));