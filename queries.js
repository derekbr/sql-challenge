var promise = require('bluebird');

var options = {
	//initialization options
	promiseLib: promise
	
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/blogposts';
var db = pgp(connectionString);

module.exports = {
	getAllPosts:getAllPosts,
	getSinglePost:getSinglePost,
	createPost:createPost,
	updatePost:updatePost,
	removePost:removePost	
	
};

function getAllPosts(req, res, next){
	db.any('select * from posts')
	  .then(function(data) {
		  res.status(200)
		    .json({
				status:'success',
				data:data,
				message: 'Retrieved ALL posts'
			    });
			
		})
	  .catch(function(err){
		  return next(err);
	      });
	  }
	
function getSinglePost(req, res, next){
	
	var postID = parseInt(req.params.id);
	db.one('select * from posts where id = $1', postID)
	  .then(function(data){
		  res.status(200)
		    .json({
				status: 'success',
				data: data,
				message: 'Retrieved post'
			});
	  })
	   .catch(function (err){
		   return next(err);
	   });
	   
function createPost(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into posts(title, post)' +
      'values(${title}, ${post})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted post'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
	   
function updatePost(req, res, next){
	db.none('update posts set title=$1, post=$2 where id=$3',
    [req.body.title, req.body.post, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated post'
        });
    })
    .catch(function (err) {
      return next(err);
    });
	
}
function removePost(req, res, next) {
	
	var postID = parseInt(req.params.id);
  db.result('delete from posts where id = $1', postID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} post`
        });
     })
    .catch(function (err) {
      return next(err);
    });
}
}