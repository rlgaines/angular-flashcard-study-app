var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

router.post('/login', function(req, res, next){
	knex.select('*').from('users')
	.then(function(data){
		function login(el, index, arr){
			if (el.email === req.body.email && el.password === req.body.password){
				console.log('SWAG')
			}
		}
		data.forEach(login)
		console.log('USERS:',data)
	})
	console.log(req.body)
})


router.post('/register', function(req, res, next){
	console.log(req.body)
})


//gets all decks 
router.get('/decks', function(req, res, next) {
	console.log('hello');
	knex.select('*').from('decks')
	.then(function(data){
		// console.log(data)
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
