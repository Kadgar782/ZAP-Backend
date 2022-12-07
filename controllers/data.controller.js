const Comment = require('../models/comment.model.js')
const Img = require('../models/img.model.js')
const Product = require('../models/product.model.js')

const getData = ((req, res) => {
    Product.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(404).json({msg: error}))
        //add another modules

})


module.exports = {
    getData
}
