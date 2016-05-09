
exports.up = function(knex, Promise) {
   return knex.schema.createTable('games', function(table){
  	table.increments();
  	table.integer('score');
 	table.integer('deck_id').unsigned();
  	table.foreign('deck_id').references('id').inTable('decks');
  	table.integer('user_id').unsigned();
  	table.foreign('user_id').references('id').inTable('users');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('games');

};
