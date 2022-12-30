const express = require('express')
const route = express.Router()
const user = require ("./controllers/userController")

route.get("/", (req, res) => {
    return res.json("Api is Working")
})

route.post("/api/register", user.register)
route.post("/api/login", user.login)
route.post("/api/logout", user.logout)

module.exports = route