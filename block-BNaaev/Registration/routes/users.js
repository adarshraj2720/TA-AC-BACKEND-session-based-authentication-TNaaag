var express = require('express');
var router = express.Router();

var User = require('../modals/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',(req,res,next)=>{
  res.render('registration')
})

// router.get('/eg')

router.post('/register',(req,res,next)=>{
  // res.render('registration')
  //console.log(req.body)
  User.create(req.body,(err,user)=>{
    console.log(err,user)
    if(err) return next(err);
    res.redirect('/users/register');
  })
})


module.exports = router;
