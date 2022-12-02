const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    thumbnailUrl: String,
    id: Number,
   })

const Img = mongoose.model('Img', ProductSchema)



module.exports = Img
