const mongoose = require('mongoose')
const {createHmac} = require('crypto')
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
     email: {
        type:String,
        require: true
     },
    password: {
        type: String,
        require: true
    },
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true})



userSchema.methods = {
    authenticate(password) {
         try {
            return this.password == this.encrytPassword(password)
         } catch (error) {
            console.log(error)
         }
    },
    encrytPassword(password) {
        if(!password) return
        try {
            return createHmac('sha256','123456').update(password).digest('hex')
        } catch (error) {
            console.log(error);
        }
    }
}
userSchema.pre("save", function(next) {
    try {
        this.password = this.encrytPassword(this.password)
        next()
    } catch (error) {
        console.log(error);
    }
})


module.exports = mongoose.model("User", userSchema)