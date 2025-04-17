const transactionModel = require('../models/transactionModel')

//todo: ------------------ Get All Transaction Ctrl ----------------
const getAllTransactionCtrl = async(req,res)=>{
    try {
        const transactions = await transactionModel.find({});
        res.status(200).json(transactions)
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error !!",
            error:error
        });
    }
} 

//todo: ------------------ Add Transaction Ctrl ----------------
const addTransactionCtrl = async(req, res)=>{
    try {
        const newTransaction = new transactionModel(req.body);
        await newTransaction.save();
        res.status(200).json({message:'Transaction Created'})
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error !!",
            error:error
        });
    }
}

//Export:
module.exports = {
    getAllTransactionCtrl,
    addTransactionCtrl,
}

