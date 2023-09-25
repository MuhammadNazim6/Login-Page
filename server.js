
const express = require("express");  //imports express framework
const path = require('path');        //imports path module
const bodyparser = require("body-parser");    //body-parser middleware
const session = require("express-session");   //express-session middleware
const{v4:uuidv4}= require("uuid");          // session secrets.

//no cache components requiring
const nocache = require('nocache');
const router = require('./router');

const app = express();      //creates an instance to express
const port = process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))  //parsing objects

app.set('view engine','ejs');  //making view-engine to ejs

// nocache middleware creating instance
app.use(nocache());

//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))


//for session management
app.use(session({
  secret:uuidv4(),
  resave:false,
  saveUninitialized:true
}));

app.use('/route',router);

//login page route
app.get('/',(req,res)=>{
  res.render('base',{title:"Login System"});
})

app.listen(port,()=>{console.log("Listening to the server on http://localhost:3000")})

