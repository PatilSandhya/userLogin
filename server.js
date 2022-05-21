const express = require('express');
const bodyparser = require('body-parser');

const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./loaders/mongoose');

const app = express();

dotenv.config({path:'.env'});
app.set('view engine','ejs');

app.use(bodyparser.urlencoded({extended:false }));
app.use(bodyparser.json({ limit: '50mb' }));
app.use(express.static(__dirname + '/public'));
app.use('/', require('./routes/usersRoute'));
app.use('/', require('./routes/adminRoute'));


connectDB();
app.listen(process.env.PORT, () =>{
    console.log(`server is running on ${process.env.PORT}`)
})