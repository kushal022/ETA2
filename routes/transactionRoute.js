const express = require('express');

//router object:
const router = express.Router();

//Import Controllers:
const { 
    getAllTransactionCtrl, 
    addTransactionCtrl, 
} = require('../controllers/transactionCtrl');


//todo:->>>>> Routes
//todo: -------------- Get || Get All Transaction Route -----------------
router.post('/getTransaction',getAllTransactionCtrl)

//todo: -------------- Post || Add Transaction Route -----------------
router.post('/addTransaction',addTransactionCtrl)

//export:
module.exports = router;