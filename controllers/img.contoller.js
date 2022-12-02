const Img = require('../models/img.model.js')

const getImgs = ((req, res) => {
    Img.find({})
        .then(result => res.status(200).json({ result }))
        .catch(error => res.status(404).json({msg: error}))//404
})

const getImg = ((req, res) => {
    Img.findOne({ _id: req.params.imgID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({msg: 'Image not found'}))
})

const createImg = ((req, res) => {
    Img.create(req.body)
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(500).json({msg:  error }))
})

const updateImg = ((req, res) => {
    Img.findOneAndUpdate({ _id: req.params.imgID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Image not found' }))
})

const deleteImg = ((req, res) => {
    Img.findOneAndDelete({ _id: req.params.productID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({msg: 'Image not found' }))
})

module.exports = {
    getImgs,
    getImg,
    createImg,
    updateImg,
    deleteImg
}
