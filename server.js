const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 8081;
const logger = require('morgan')
const connection = require('./database')
const cors = require('cors');

app.listen(port,() =>{
    console.log("Server is getting started");

})

app.use(express.json())
app.use(cors());

app.use(express.urlencoded({extended: false}))

app.set("views",path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
const routes = require('./routes');
app.use("/",routes.user);

app.get("/",(req,res) =>{
    res.send("Hello World");

})

