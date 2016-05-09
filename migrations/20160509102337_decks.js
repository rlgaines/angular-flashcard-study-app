
exports.up = function(knex, Promise) {
   return knex.schema.createTable('decks', function(table){
  	table.increments();
  	table.integer('user_id').unsigned();
  	table.foreign('user_id').references('id').inTable('users');
  	table.string('name');
  	table.text('description');
  	table.string('image');

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('decks');

};
