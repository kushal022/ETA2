const express = require('express');

//router object:
const router = express.Router();

//Import Controllers:
const { 
    getAllTransactionCtrl, 
    addTransactionCtrl,
    editTransactionCtrl, 
} = require('../controllers/transactionCtrl');


//todo:->>>>> Routes
//todo: -------------- Post || Get All Transaction Route -----------------
router.post('/getAllTransaction',getAllTransactionCtrl)

//todo: -------------- Post || Add Transaction Route -----------------
router.post('/addTransaction',addTransactionCtrl)

//todo: -------------- Put || Edit Transaction Route -----------------
router.put('/editTransaction',editTransactionCtrl)

//export:
module.exports = router;