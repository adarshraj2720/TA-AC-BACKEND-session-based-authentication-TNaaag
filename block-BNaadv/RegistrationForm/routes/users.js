var express = require('express');
var router = express.Router();


var User= require('../modals/user')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/success',(req,res)=>{
  res.render('success')
})

router.get('/',(req,res,next)=>{
  res.render('registration')
})



router.post('/register',(req,res,next)=>{
  // res.render('registration')
  //console.log(req.body)
  User.create(req.body,(err,user)=>{
    console.log(err,user)
    if(err) return next(err);
    res.render('login');
  })
})

router.get('/register', function(req, res, next) {
  var wrongPassword = req.flash('wrongPassword')[0]
  res.render('registrationForm' ,{ wrongPassword});
});

router.get('/login', function(req, res, next) {
   var error = req.flash('error')[0]
   var errorPassword = req.flash('errorPassword')[0];
   console.log(error ,errorPassword)
  res.render('login' ,{error ,errorPassword});
});


router.post('/login',(req,res,next)=>{
 // var {email,password} = req.body;
 var email= req.body.email[0]
 var password= req.body.email[1]
  console.log(req.body.email[0],'full')
  if(!email || !password){
    req.flash('error'),('It is required')
    return res.redirect('/users/login')
  }
  if(password.length<4){
    req.flash('errorpassword','password is to short')
    //req.flash('error'),('It is too short')
    return res.redirect('/users/login')
  }
  User.findOne({email},(err,user)=>{
    if(err) return next(err)
    console.log(user,'findone')
    //no user
    if(!user){
      return res.redirect('/users/login');
    }
    //compare password
    user.verifypassword(password,(err,result)=>{
      console.log(result,'verify')
      if(err) return next(err);
      if(!result){
        req.flash('wrongpassword','failed')
        return res.redirect('/users/login')
      }
      //partial logged in user information
      req.session.userId = user.id;
      res.redirect('/users/success')
    })
  })
})


router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users/login');
})

module.exports = router;
