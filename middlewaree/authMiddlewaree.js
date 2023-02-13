const jwt = require("jsonwebtoken")
const {secret} = require("../config")

module.exports = function (req, res, next) {    
    console.log(req.body) 
    if (req.body === undefined || {}) {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
         if (!token) {
            return res.status(403).json({message:"User is not admin"})
         }
         const decodeData = jwt.verify(token, secret)
         req.user = decodeData
         next() 
    } catch(e) {
        console.log(e)
        return res.status(403).json({message:"User is not loged in"})
    }

}; 