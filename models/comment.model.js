const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    userId: String,
    id: Number,
    body:String,
   })

const Comment = mongoose.model('Comment', ProductSchema)



module.exports = Comment