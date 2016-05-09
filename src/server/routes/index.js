var express = require('express');
var router = express.Router();
var knex = require('../../../db/knex');

router.get('/decks', function(req, res, next) {
	console.log('hello');
	knex.select('*').from('decks')
	.then(function(data){
		console.log(data)
	   res.send(data);

	})
});

module.exports = router;
