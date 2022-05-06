const express = require('express');
const bodyparser = require('body-parser');

const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./loaders/mongoose');

const app = express();

dotenv.config({path:'.env'});

app.use(bodyparser.urlencoded({extended:false }));
app.use(bodyparser.json({ limit: '50mb' }));

app.use('/', require('./routes/usersRoute'));

connectDB();
app.listen(process.env.PORT, () =>{
    console.log(`server is running on ${process.env.PORT}`)
})