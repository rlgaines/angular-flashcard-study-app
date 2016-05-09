
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('decks').del(), 

    // Inserts seed entries
    knex('decks').insert(
    {
      user_id: "1",
      name: "CSS Trivia",
      description: "Help develope your CSS knowledge.",
      image: "http://rigor.com/wp-content/uploads/2015/12/CSS.png"
    }),
        
    knex('decks').insert(
    {
      user_id: "1",
      name: "HTML Trivia",
      description: "Help develope your HTML knowledge.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2000px-HTML5_logo_and_wordmark.svg.png"
    }),

    knex('decks').insert(
    {
      user_id: "2",
      name: "HTML Trivia",
      description: "Help develope your HTML knowledge.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2000px-HTML5_logo_and_wordmark.svg.png"

    })
    
   );
};	