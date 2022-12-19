const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    userId: String,
    title:String,
    id: Number,
    body:String,
    thumbnailUrl: String,
   })

const Product = mongoose.model('Product', ProductSchema)



module.exports = Product
