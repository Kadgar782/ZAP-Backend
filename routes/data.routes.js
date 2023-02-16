const express = require('express')
const router = express.Router()
const controller = require ('../controllers/data.controller')
const authMiddlewaree = require("../middlewaree/authMiddlewaree")

router.get('/',authMiddlewaree, controller.getData)

module.exports = router