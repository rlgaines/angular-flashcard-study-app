var express = require('express');
var router = express.Router();
var moment = require('moment');
var jwt = require('jwt-simple');
var knex = require('../../../db/knex');
var pg = require('pg');

//checks user if they are in database, logs them in with token
router.post('/login', function(req, res, next){
	knex('users').where('email', req.body.email)
	.then(function(data){
		// console.log(data)
			if (data.length){
				delete data[0].password
				      var token = generateToken(data);
				      // console.log(data)
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

//register new user gives token
router.post('/register', function(req, res, next){
	knex('users').insert({
		email:req.body.email,
		password: req.body.password
	}).returning('*')
 .then(function (member) {
 	console.log(member)
      var token = generateToken(member[0].email);
      console.log(member)
      return res.json({
        token: token,
        data: member[0].id
      });
    })
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
	console.log('id:'+id)
	if(Number.isInteger(id)){
		knex.select('decks.name', 'decks.image', 'decks.description', 'cards.question', 'cards.answer')
		.from('decks')
		.leftJoin('cards','cards.deck_id','decks.id')
		.where('decks.id',id)
		.then(function(data){
			console.log(data)
		   res.send(data);

		})
    }
});

//post for new deck in database
router.post('/:id/new', function(req, res, next) {
	console.log('NEW',req.body, 'ID:', req.params.id)
	knex('decks').insert({
			user_id: req.params.id,
			name: req.body[0].name,
			description: req.body[0].description,
			image: req.body[0].image
		})
		.returning('id')
		.then(function(deckId){
			cardsArray = req.body[1]
			cardsArray.forEach(function(card){
				 card.deck_id = deckId[0]
			})
			var promises = cardsArray.map(function(newCard){
					console.log('MAP',newCard)
					return knex('cards').insert({
						deck_id: newCard.deck_id,
						question: newCard.question,
						answer: newCard.answer
					})
				})
			Promise.all(promises).then(function(){
					res.json('success');
				})

		})
		.catch(function(error) {
	    console.error(error);
	  })


})



router.post('/:id/add', function(req, res, next){
	console.log("ID:", req.params.id, "ADD:", req.body)

	knex('decks').insert({
		user_id: req.params.id,
		name: req.body[0].name,
		description: req.body[0].description,
		image: req.body[0].image
	})
	.returning('id')
	.then(function(deckId){
		cardsArray = req.body
		cardsArray.forEach(function(card){
			card.deck_id = deckId
		})
		var promises = cardsArray.map(function(newCard){
				console.log(newCard)
				return knex('cards').insert({
					deck_id: newCard.deck_id[0],
					question: newCard.question,
					answer: newCard.answer
				})
			})
		return Promise.all(promises)
	})
	.then(function(){
		res.send
	})
	.catch(function(error) {
    console.error(error);
  })
	// [knex deck insert statement]
	// .returning('id')
	// .then(function (deckId) {
 //      cardsArray = [{ ... }, { ... }]

 //      // add the deckID to each card
 //      cardsArray.forEach(function (card) {
 //        card.deck_id = deckID;
 //      })
    
 //      // create an array of knex insert promises per card
 //      var promises = cardsArray.map(function (card) {
 //      	return knex('cards').insert ...
 //      })

 //      // promises is an array of promises, each of which
 //      // inserts a new card with the above deck id

 //      return Promise.all(promises);
	// })
	// .then(function () {
	// 	// res send
	// })
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
