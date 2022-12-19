const express = require('express')
const router = express.Router()

const {getData} = require('../controllers/data.controller.js')

router.get('/', getData)

module.exports = router