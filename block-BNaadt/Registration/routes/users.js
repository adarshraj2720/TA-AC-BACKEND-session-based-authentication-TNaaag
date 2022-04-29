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
  var error =req.flash('error')[0];
  console.log(err);
  res.render('login',{error});
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
    req.flash('error'),('It is required')
    return res.redirect('/users/login')
  }
  if(password.length<4){
    req.flash('error'),('It is too short')
    return res.redirect('/users/login')
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


router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
})


module.exports = router;
