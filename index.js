const express = require('express')
const app = express();
const cors = require('cors');
const morgan = require('morgan')
const colors = require('colors');
const dotenv = require('dotenv');
const connectDb = require('./config/connectDb');

dotenv.config();
const PORT = process.env.PORT || 3500;

//Connect DB
connectDb();

//Middlewares:
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

//import routes:
const userRoutes = require('./routes/userRoute');
const transactionRoutes = require('./routes/transactionRoute');

//Routes
app.get('/',(req,res)=>{
    res.send("Hello from Home Page")
})

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/transaction', transactionRoutes);

//Server Listen
app.listen(PORT , ()=>{
    console.log(`Server is listening at ${PORT}`)
})