const express = require('express')
const { addCart, removeCart, getCarts, getCart, updateCart } = require('../controllers/cart')
const routerCart = express.Router()

routerCart.get("/carts", getCarts)
routerCart.get("/carts/:id", getCart)
routerCart.put("/carts/:id", updateCart)
routerCart.post("/carts", addCart)
routerCart.delete("/carts/:id", removeCart)

module.exports = routerCart 