var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var knex = require('../../../db/knex');

router.post('/login', function(req, res, next){
	knex('users').where('email', req.body.email)
	.then(function(data){
		console.log(data)
			if (data.length){
				delete data[0].password
				      var token = generateToken(data);
				      res.status(200).json({
				        status: 'success',
				        data: {
				          token: token,
				          user: data[0]
				        }
				      });		
			} else {
				 return res.status(401).json({
			        status: 'fail',
			        message: 'Email or Password are incorrect',
			        requestBody: req.body
			      });
			}
		
	})
})


router.post('/register', function(req, res, next){
	knex('users').insert({
		email:req.body.email,
		password: req.body.password
	})
 // .then(function (member) {
 // 	console.log(member)
      // var token = generateToken(member);
      // return Promise.resolve({
      //   token: token,
      //   data: member
      // });
    // })
})


//gets all decks 
router.get('/:id/decks', function(req, res, next) {
	var id = req.params.id
	knex.select('decks.name','decks.image','decks.description','decks.id')
	.from('users')
	.leftJoin('decks','decks.user_id','users.id')
	.where('users.id',id)
	.then(function(data){
		console.log(data)
	   res.send(data);

	})
});

//gets all decks 
router.get('/:id/quiz', function(req, res, next) {
	console.log('hello');	
	var id = req.params.id	
	knex.select('decks.name', 'decks.image', 'decks.description', 'cards.question', 'cards.answer')
	.from('decks')
	.leftJoin('cards','cards.deck_id','decks.id')
	.where('decks.id',id)
	.then(function(data){
		console.log(data)
	   res.send(data);

	})
});

//post for new deck in database
router.post('/new', function(req, res, next) {
	console.log(req.body)
})






// generate a token
function generateToken(user) {
  var payload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user._id
  };
  return jwt.encode(payload, '\x07q\xa1\xb0\xa0\xa7x\xda\xb2\xa9+g|\xd5\x9d\xd9\x9f\x12\xc4-I\x12Q\xfc');
}
module.exports = router;
