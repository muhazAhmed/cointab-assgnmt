const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
require("dotenv").config()
const route = require ('./route')
const db = require ("./db")

app.use(express.json())
app.use(cookieParser())
app.use('/', route)


app.listen(8800, () => {
    console.log("Server is Running")
})