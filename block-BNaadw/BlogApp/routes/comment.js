var express = require('express');
var router = express.Router();

var User= require('../modals/user')
var Articel= require('../modals/article')
var Comment= require('../modals/comment');
const { route } = require('.');

//edit
router.get('/:slug/edit',(req,res,next)=>{
    var slug = req.params.slug;
    Comment.findOne({slug:slug},(err,comments)=>{
        if(err) return next(err);
        res.render('editComment',{comments:comments});
    })
})


router.post('/:slug/edit',(req,res,next)=>{
    var slug = req.params.slug;
    console.log(slug,"edit")
    Comment.findOneAndUpdate({slug:slug},req.body,(err,updatecomment)=>{
        if(err) return next(err);
        console.log(updatecomment,"update");
        res.redirect('/article/' + updatecomment.articelSlug)
    })
})


//delete
router.get("/:slug/delete", (req, res, next) => {
    var slug = req.params.slug;
    console.log(slug,'delete')
    Comment.findOneAndRemove({slug :slug }, (err, deletecomment) => {
      if (err) return next(err);
      console.log(deletecomment)
      Articel.findByIdAndUpdate(deletecomment.articlesId, {
        $pull: {commentsId  : deletecomment._id },
      });
      res.redirect("/article/" +deletecomment.articleSlug);
    });
  });


//like
router.get('/:slug/like',(req,res,next)=>{
    var slug = req.params.slug;
    Comment.findOneAndUpdate({slug:slug},{$inc:{likes:1}},(err,likes)=>{
        console.log(likes,"likes")
        if(err) return next(err);
        res.redirect('/article/'+ likes.slug)
    })
})


//dislike
router.get('/:slug/dislike',(req,res,next)=>{
    var slug = req.params.slug;
    Comment.findOneAndUpdate({slug:slug},{$inc:{likes:-1}},(err,likes)=>{
        console.log(likes,"likes")
        if(err) return next(err);
        res.redirect('/article/'+ likes.articelSlug)
    })
})



module.exports=router;