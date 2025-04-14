const express = require('express')
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const colors = require('colors');
const dotenv = require('dotenv');


dotenv.config();
const PORT = process.env.PORT || 3500;

//Middlewares:
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

//Routes
app.get('/',(req,res)=>{
    res.send("Hello from Home Page")
})

//Server Listen
app.listen(PORT , ()=>{
    console.log(`Server is listening at ${PORT}`)
})