const express = require('express')
const router = express.Router()
const authMiddlewaree = require("../middlewaree/authMiddlewaree")

const {getData} = require('../controllers/data.controller.js')

router.get('/', getData)

module.exports = router