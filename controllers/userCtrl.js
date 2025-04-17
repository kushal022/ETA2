//user model:
const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//todo: ---------------- Post || Login User Ctrl -------------------------
const loginCtrl = async(req,res)=>{
    try {
        const {email, password } = req.body;

        // if(email==='' || password===''){
        if(!email && !password){
            return res.status(400).json({message: 'Please fill all details'})
        }

        const user = await userModel.findOne({email});

        if(!user) return res.status(404).json({message: 'Invalid credentials'})

        const isMatch = await bcrypt.compare(password, user.password); // true/false
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const authClaims = [
            {name: user.username},
            {email: user.email}
        ]
        
        const token = jwt.sign({authClaims},process.env.SECRET_KEY,{expiresIn:"30d"})

        res.status(200).json({
            success: true,
            id: user._id,
            username: user.username,
            email:user.email,
            token: token,
            message: 'Logged Successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error !!",
            "error":error
        });
    }
}

//todo: ---------------- Post || Register User Ctrl -------------------------
const registerCtrl = async(req,res)=>{
    try {
        const {username, email,password} = req.body;
        console.log(req.body)

        // if(username=='' || email=='' || password==''){
        if(!username && !email &&  !password ){
            return res.status(400).json({message: 'Please fill all details'})
        }
        
        //* Check username length is more than 3
        if (username && username.length < 4){
            return res.status(400).json({message: 'Username length should be greater than 3'})
        }

        //* Check email already exists ? 
        const existingEmail = await userModel.findOne({email: email});
        if (existingEmail){
            return res.status(400).json({message: 'Email already exists'})
        }

        //* Check password length:
        if (password.length <= 5){
            return res.status(400).json({message: "Password's length should be greater than 5"})
        }

        //* Hash Password:
        const hashedPassword = await bcrypt.hash(password, 10);

        //* Create New user:
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        });

        await newUser.save();
        
        return res.status(201).json({
            success:true,
            message:'Registration Successful',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message:"Internal server error !!",
            "error":error
        });
    }
}

//Export
module.exports = {
    loginCtrl,
    registerCtrl,
}