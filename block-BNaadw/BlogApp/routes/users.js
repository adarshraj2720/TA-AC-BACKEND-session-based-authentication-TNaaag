var express = require('express');
const { route } = require('.');
var router = express.Router();


var User= require('../modals/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  console.log(req.session)
  res.send('login success');
});

router.get('/register',(req,res,next)=>{
  res.render('registrationform');
})

router.post('/register',(req,res,next)=>{
  User.create(req.body,(err,user)=>{
    if(err) return next(err);
    res.redirect('/users/register')
  });
})



router.get('/login' ,(req ,res ,next) => {
  res.render('login')
})

router.post('/login', function(req, res, next) {
  var {email ,password} = req.body;
  console.log(req.body);
  if(! email ||! password) {
    // req.flash('error' ,'email/password are required')
   return res.redirect('/users/article/new')
  }

if(password.length < 4){
 // req.flash('errorPassword' ,'password less than four')
  return res.redirect('/users/login')
}
  User.findOne({email} ,(err ,user) => {
    if(err) return next(err)

    // no user
    if(! user) {
      return res.redirect('/users/login');
    }

    // compare
    user.verifyPassword(password ,(err ,result) => {
      if(err) return next(err);
      console.log(err ,result,"Result")
      if(! result) {
       // req.flash('wrongPassword' ,'password is worng')
         return res.redirect('/users/login')
      }

// persist login user info
      req.session.userID = user.id
      res.redirect('/article/new')

    })
  })

});




module.exports = router;
