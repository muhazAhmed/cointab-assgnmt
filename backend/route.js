const express = require('express')
const route = express.Router()

route.get("/", (reqe, res) => {
    return res.json("Api is Working")
})

module.exports = route