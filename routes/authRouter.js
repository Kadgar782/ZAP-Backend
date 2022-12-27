const Router = require('express')
const router = new Router()
const controller = require('../controllers/auth.controller')
const {check} = require("express-validator")

router.post('/registration', [
    check('username', "Username can't be empty").notEmpty(),
    check('password', "Password must be more than 4 characters and less than 10").isLength({min:4, max:10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)

module.exports = router