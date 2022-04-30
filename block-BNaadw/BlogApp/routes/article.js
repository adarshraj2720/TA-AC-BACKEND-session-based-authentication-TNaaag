var express = require('express');
var router = express.Router();

var User= require('../modals/user')
var Articel= require('../modals/article')
var Comment= require('../modals/comment');
const { route } = require('.');

//create
router.get('/new',(req,res,next)=>{
    res.render('articleform')
})

router.post('/',(req,res,next)=>{
    Articel.create(req.body,(err,articel)=>{
        console.log(articel)
        if(err) return next(err);
        res.redirect('/article/new')
    })
})


//read
router.get('/',(req,res)=>{
    Articel.find({},(err,articles)=>{
        if(err) return next(err);
        res.render('articles',{articles});
    })
})


router.get('/:slug',(req,res,next)=>{
    var slug = req.params.slug;
    Articel.findOne({slug:slug}).populate('commentsId').exec((err,article)=>{
        console.log(article);
        if(err) return next(err);
        res.render('singleArticel',{article})
    })
})

//edit

router.get('/:slug/edit',(req,res,next)=>{
    var slug = req.params.slug;
    Articel.findOne({slug:slug},(err,articles)=>{
        if(err) return next(err);
        res.render('editArticles',{articles});
    })
})


router.post('/:slug/edit',(req,res,next)=>{
    var slug = req.params.slug;
    Articel.findOneAndUpdate({slug:slug},req.body,(err,updatearticles)=>{
        if(err) return next(err);
        console.log(updatearticles);
        res.redirect('/article' +slug)
    })
})


//delete
router.get('/:slug/delete',(req,res,next)=>{
    var slug = req.params.slug;
    Articel.findOneAndDelete({slug:slug},(err,deletearticel)=>{
        if(err)  return next(err);
        res.redirect('/article')
    })
})

//like
router.get('/:slug/like',(req,res,next)=>{
    var slug = req.params.slug;
    Articel.findOneAndUpdate({slug:slug},{$inc:{likes:1}},(err,likes)=>{
        if(err) return next(err);
        res.redirect('/article/'+slug)
    })
})

//dislike
router.get('/:slug/dislike',(req,res,next)=>{
    var slug = req.params.slug;
    Articel.findOneAndUpdate({slug:slug},{$inc:{likes:-1}},(err,likes)=>{
        if(err) return next(err);
        res.redirect('/article/'+slug)
    })
})

//add comments
router.post("/:slug/comment", (req, res, next) => {
    req.body.articlesId = req.params.id;
    var slug = req.params.slug;
    req.body.articleSlug = slug;
    console.log(req.params.id ,"id")
    Comment.create(req.body, (err, comment) => {
      console.log(comment);
      if (err) return next(err);
      Articel.findOneAndUpdate(
        {slug :slug},
        { $push: {commentsId : comment.id } },
        (err, updatearticle) => {
          console.log(err, updatearticle);
          res.redirect("/article/" + updatearticle.slug);
        }
      );
    });
  });


module.exports=router;