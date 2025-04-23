const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    userId: {
        type:String,
        required: [true,'user is required']
    },
    amount: {
        type:Number,
        required: [true,'amount is required']
    },
    type: {
        type: String,
        require: [true,'type is required']
    },
    category: {
        type: String,
        require: [true,'category is required']
    },
    reference:{
        type: String
    },
    description: {
        type:String
    },
    date:{
        type:Date,
        required: [true, 'date is required']
    }
},{timestamps:true});

const transactionModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionModel;