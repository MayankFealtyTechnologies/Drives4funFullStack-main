const express = require('express');
const app = express();
const env = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
env.config();
require('./database/database');

const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/public', express.static(path.join(__dirname, "public")));

// ** Front-End Content ** //
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.use("/", express.static(path.join(__dirname, "../build")));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

//users routes
app.use("/api", require("./mvc/users/router"));

app.listen(3001, (err) => { err ? console.log(err) : console.log(`server is runing at ${3001}`) })