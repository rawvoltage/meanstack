var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.use(function(req, res, next) {
   
    if(req.method === "GET"){
        //
        return next();
    }
    if(!req.isAuthenticated()){
        //
       return res.redirect('/#login');
       }
    
    return next();
});
router.route('/posts')
    
    .get(function(req, res){
        res.send({message: 'TODO return all posts'});
    })

    .post(function(req, res){
        res.send({message: 'TODO Create a new post'});
    });

router.route('/posts/:id')
    .get(function(req, res) {
        res.send({message: 'Todo return posts with id ' + req.params.id});
    })

    .put(function(req, res) {
        res.send({message: 'Todo modify post with id ' + req.params.id});
    
    })

    .delete(function(req, res) {
        res.send({message: 'Todo delete post with id ' + req.params.id});
    });
module.exports = router;