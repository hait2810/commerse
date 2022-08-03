const Cart = require('../models/cart')

const addCart = async (req,res) => {
        try {
            const cart = await Cart(req.body).save()
            res.json(cart)
        } catch (error) {
            res.status(400).json({message: "Không thể thêm"})
        }
}
const getCarts = async (req,res) => {
    try {
        const cart = await Cart.find().sort({createdAt: -1}).exec()
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: "Không thể hiển thị"})
    }
}
const removeCart = async (req,res) => {
    try {
        const cart = await Cart.findByIdAndDelete({_id: req.params.id}).exec()
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: "Không thể xoá"})
    }
}


const getCart = async (req,res) => {
    try {
        const cart = await Cart.findById({_id: req.params.id}).exec()
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: "Không thể hiển thị"})
    }
}

const updateCart = async (req,res) => {
    try {
        const cart = await Cart.findByIdAndUpdate({_id: req.params.id},req.body).exec()
        res.json(cart)
    } catch (error) {
        res.status(400).json({message: "Không thể hiển sửa"})
    }
}


module.exports = {addCart, getCarts,getCart, removeCart, updateCart}