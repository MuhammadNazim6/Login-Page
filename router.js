 var express = require("express");
var router = express.Router();

const credential = {
  email:"nazimnazz66@gmail.com",
  password:"yoyo@123"
}

//login user
router.post('/login',(req,res)=>{
 if(req.body.email===credential.email && req.body.password===credential.password){
  //login successfull 
  req.session.user= req.body.email;
  res.redirect('/route/dashboard');

  // invalid-email
 }else if(req.body.email===credential.email && req.body.password!==credential.password){
  //incorrect-password
  res.render('base',{message:'Incorrect password !!'});
 }else{
  res.render('base',{message:'Enter a valid username !!'});
 }
}); 


//route for dashboard
router.get('/dashboard',(req,res)=>{
  if(req.session.user){
    res.render('dashboard',{user:req.session.user})
  }else{
    res.redirect('/');
  }
})

//route for logout
router.get('/logout',(req,res)=>{
  req.session.destroy(function(err){
    if(err){
      console.log(err);
      res.send("Error")
    }else{
      res.render('base',{title:"Express",logout:"You have logged out successfully !!"})
    }
    })
  })
module.exports = router;