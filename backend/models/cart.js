const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    product: {
        type: [],
        require: true
    },
    infomation: {
        type: {},
        require: true
    },
    status: {
        type: Number,
        default: 0
    },
    totalprice: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model("Cart", cartSchema);