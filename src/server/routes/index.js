var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var knex = require('../../../db/knex');

//checks user if they are in database, logs them in with token
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
				          user: data[0].id
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
	knex.select('*')
	.from('decks')
	.then(function(data){
		// console.log(data)
	   res.send(data);

	})
});

//gets deck for quiz 
router.get('/:id/quiz', function(req, res, next) {
	var id = req.params.id	
	knex.select('decks.name', 'decks.image', 'decks.description', 'cards.question', 'cards.answer')
	.from('decks')
	.leftJoin('cards','cards.deck_id','decks.id')
	.where('decks.id',id)
	.then(function(data){
		// console.log(data)
	   res.send(data);

	})
});

//post for new deck in database
router.post('/:id/new', function(req, res, next) {
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

function ensureAuthenticated(req, res, next) {
  // check headers for the presence of an auth object
  if(!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'fail',
      message: 'No header present or no authorization header.'
    });
  }
  // decode the token
  var header = req.headers.authorization.split(' ');
  var token = header[1];
  var payload = jwt.decode(token, '\x07q\xa1\xb0\xa0\xa7x\xda\xb2\xa9+g|\xd5\x9d\xd9\x9f\x12\xc4-I\x12Q\xfc');
  var now = moment().unix();
  // ensure that it is valid
  if(now > payload.exp || payload.iat > now || user.role != 'admin') {
    return res.status(401).json({
      status: 'fail',
      message: 'Token is invalid'
    });
  }
  // ensure user is still in the database
  knex('users')
    .where('id', payload.sub)
    .first()
    .then(function(user) {
      // if in database, let them access the route
      next();
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = router;
