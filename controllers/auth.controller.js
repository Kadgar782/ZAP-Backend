const User = require('../models/user.model.js')
const Role = require('../models/role.model.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const {validationResult} = require("express-validator")
const {secret, secretRefresh} = require ("../config")
const tokenModel = require ("../models/token.model")
const salt = bcrypt.genSaltSync(7);

const  generateAccessToken= (id,roles) =>{
   const payload = {
      id,
      roles
   }

   const accessToken = jwt.sign(payload,secret,{expiresIn:"30m"})
   const refreshToken = jwt.sign(payload,secretRefresh,{expiresIn:"30m"})

   return {
      accessToken,
      refreshToken   
   }
}

const saveToken = async (userId, refreshToken) =>{
   const tokenData = await tokenModel.findOne({user: userId})
     if (tokenData) {
         tokenData.refreshToken = refreshToken;
         return tokenData.save();
     }
     const token = await tokenModel.create({user: userId, refreshToken})
     return token;
}


class authController {  
 
    async registration (req, res) {
       try{
           const errors = validationResult(req)
           if (!errors.isEmpty()){
            return res.status(400).json({message:"Error during registration",errors})
           }

           const {username, password} = req.body
           const candidate = await User.findOne({username})
           if (candidate) {
            return res.status(400).json({message:"User with this name already exists"})
           }

           const hashPassword = bcrypt.hashSync(password, salt);
           const userRole = await Role.findOne({value: "USER"})

           const user = new User ({username, password: hashPassword, roles: [userRole.value]})
           await  user.save()
           return res.json({message:"User has been successfully registered"})

       } catch (e) {
          console.log(e)
          res.status(400).json( {message:"Registration error"})
       }

    }

    async login(req, res) {
       try{
           const{username,password} = req.body
           const user = await User.findOne({username})
           if(!user){
               return res.status(400).json({message:`User ${username} not found`})
           }
           const validPassword = bcrypt.compareSync(password, user.password)
           if(!validPassword) {
            return res.status(400).json({message:"Invalid password "})
           }
          const token = generateAccessToken(user._id, user.roles)
          await saveToken(user._id, token.refreshToken)
          return res.json({token})
       } catch (e) {
         console.log(e)
         res.status(400).json( {message:'Login error'})
       }

    }

    async getUsers (req, res) {
       try{
         console.log(req.user.roles) 
          const users = await User.find() 
        res.json(users)
       } catch (e) {

       }

    }

    getUserRole(req, res) {
      try{
         User.findOne({ _id: req.params.userID })
         .then(result => res.status(200).json({ result }))   
      } catch (e) {
         console.log(e)
         res.status(404).json({msg: 'User not found'})
      }
    }
}

module.exports = new authController()