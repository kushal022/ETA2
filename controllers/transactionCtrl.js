const transactionModel = require('../models/transactionModel')
const moment = require('moment')

//todo: ------------------ Get All Transaction Ctrl ----------------
const getAllTransactionCtrl = async(req,res)=>{
    try {
        const {Freq,selectDate,type} = req.body
        const transactions = await transactionModel.find({
            //* Condition for Date filter:
            ...(Freq !== 'custom'?{
                date:{
                    $gt:moment().subtract(Number(Freq),'d').toDate(),
                }
            }:{
                date:{
                    $gte: selectDate[0],
                    $lte: selectDate[1],
                }
            })
            ,
            userId:req.body.userId,
            //* Condition for Type:
            ...(type !== 'all' && { type})
        });
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

//todo: ------------------ Edit Transaction Ctrl ----------------
const editTransactionCtrl = async(req, res)=>{
    try {
        const transaction = await transactionModel.findByIdAndUpdate(
            {_id: req.body.transactionId},
            req.body.payload
        )
        if(!transaction){
            return res.status(401).json({message:'Transaction not found'})
        }
        res.status(200).json({message:'Transaction Edited Successfully'})
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Internal server error !!",
            error:error
        });
    }
}

//todo: ------------------ Delete Transaction Ctrl ----------------
const deleteTransactionCtrl = async(req, res)=>{
    try {
        const transaction =  await transactionModel.findOneAndDelete(
            {_id: req.body.transactionId}
        )
        if(!transaction){
            return res.status(401).json({message:'Transaction not found'})
        }
        res.status(200).json({message:'Transaction Deleted Successfully'})
        
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
    editTransactionCtrl,
    deleteTransactionCtrl,
}

