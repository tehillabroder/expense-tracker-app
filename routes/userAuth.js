const express = require('express')
const router = express.Router()

const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../models/User')
const {registerValidation, loginValidation} = require('../validations/validation')

router.post('/register', async(req,res)=>{
    //  Validation 1 to check user input
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send({message:error["details"][0]["message"]})
    }
    //  Validation 2 to check if user exists (by duplicate email)
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send('User already exists.')
    }
    //  Don't want to save password unencrypted into db
    //  Hash using bcryptjs
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)
    //  Code to insert a new user into the db
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
    
})


router.post('/login', async(req,res)=>{
    //  Validation 1 to check user input
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error["details"][0]["message"]})
    }
    //  Validation 2 to make sure user exists
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).send('User does not exist.')
    }
    //  Validation 3 to see if password is correct -> auth token
    //  have to decrypt it first
    const passwordValidation = await bcryptjs.compare(req.body.password,user.password)
    if(!passwordValidation){
        return res.status(400).send('Password is incorrect.')
    }
    //  Only users that have logged in should be able to access films.
    //  instead of res.send("success!"), use a key - an auth token
    const token = jsonwebtoken.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).send({'auth-token':token})
})
module.exports = router