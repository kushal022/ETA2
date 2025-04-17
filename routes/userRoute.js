const express = require('express');

//router object:
const router = express.Router();

//Controllers:
const {loginCtrl, registerCtrl} = require('../controllers/userCtrl')


//todo:->>>>> Routes
//todo: -------------- Post || Login User -----------------
router.post('/login',loginCtrl)

//todo: -------------- Post || Register User -----------------
router.post('/register',registerCtrl)

//export:
module.exports = router;