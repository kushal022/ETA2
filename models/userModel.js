const mongoose = require('mongoose');

//Schema Design:
const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required: [true,'name is required']
    },
    email : {
        type:String,
        required: [true,'email is required and should be unique'],
        unique:true
    },
    password : {
        type:String,
        required: [true,'password is required']
    }
    },{timestamps:true}
);

//Model:
const userModel = mongoose.model('users', userSchema);
//Export:
module.exports = userModel;