var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')

var User = require('../modals/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  console.log(req.session)
});

router.get('/register',(req,res,next)=>{
  res.render('registration')
})

router.get('/login',(req,res,next)=>{
  res.render('login')
})

router.post('/register',(req,res,next)=>{
  // res.render('registration')
  //console.log(req.body)
  User.create(req.body,(err,user)=>{
    console.log(err,user)
    if(err) return next(err);
    res.redirect('/users/register');
  })
})


router.post('/login',(req,res,next)=>{
  var {email,password} = req.body;
  if(!email || !password){
    res.redirect('/users/login')
  }
  User.findOne({email},(err,user)=>{
    if(err) return next(err)

    //no user
    if(!user){
      return res.redirect('/users/login');
    }
    //compare password
    user.verifypassword(password,(err,result)=>{
      if(err) return next(err);
      if(!result){
        return res.redirect('/users/login')
      }
      //partial logged in user information
      req.session.userId = user.id;
      res.redirect('/users')
    })
  })
})



module.exports = router;
