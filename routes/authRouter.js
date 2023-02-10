const Router = require('express')
const router = new Router()
const controller = require('../controllers/auth.controller')
const {check} = require("express-validator")
const authMiddlewaree = require("../middlewaree/authMiddlewaree")

router.post('/registration', [
    check('username', "Username can't be empty").notEmpty(),
    check('password', "Password must be more than 4 characters and less than 10").isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddlewaree, controller.getUsers)
router.get('/:userID', controller.getUserRole)


module.exports = router