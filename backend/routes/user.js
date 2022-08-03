const express = require('express')
const { signup, signin, removeUser, updateUser, getUser, getUsers } = require('../controllers/user')
const routerUser = express.Router() 

routerUser.post("/signup", signup)
routerUser.post("/signin", signin)
routerUser.delete('/user/:id', removeUser)
routerUser.put('/user/:id', updateUser)
routerUser.get('/users/', getUsers)
routerUser.get('/user/:id', getUser)
module.exports = routerUser