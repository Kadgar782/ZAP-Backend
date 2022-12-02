const express = require('express')
const router = express.Router()

const  { 
    getImgs,
    getImg,
    createImg,
    updateImg,
    deleteImg
} = require('../controllers/img.contoller.js')

router.get('/', getImgs)

router.get('/:imgID', getImg)

router.post('/', createImg) 

router.put('/:imgID', updateImg) 

router.delete('/:imgID', deleteImg)

module.exports = router
