//user model:
const userModel = require('../models/userModel')


//todo: ---------------- Post || Login User Ctrl -------------------------
const loginCtrl = async(req,res)=>{
    try {
        const {email, password } = req.body;
        const user = await userModel.findOne({email, password});
        if(!user) return res.status(404).json({msg: 'User not found'})
        
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
}

//todo: ---------------- Post || Register User Ctrl -------------------------
const registerCtrl = async(req,res)=>{
    try {
        const {username, email,password} = req.body;
        const newUser = new userModel(req.body)
        await newUser.save();
        res.status(201).json({
            success:true,
            newUser,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
}

//Export
module.exports = {
    loginCtrl,
    registerCtrl,
}