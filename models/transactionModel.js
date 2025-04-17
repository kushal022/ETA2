const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type:Number,
        required: [true,'amount is required']
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
        type:String,
        required: [true, 'date is required']
    }
},{timestamps:true});

const transactionModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionModel;