var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

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

module.exports = router;
