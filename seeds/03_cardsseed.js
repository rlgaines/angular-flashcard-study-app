
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('cards').del(), 

    // Inserts seed entries
    knex('cards').insert(
    {
      deck_id: "1",
      question: "What does CSS stand for?",
      answer: "Cascading Style Sheets"
    }),
        
    knex('cards').insert(
    {
      deck_id: "1",
      question: "What is the correct HTML for referring to an external style sheet?",
      answer: "<link rel='stylesheet' type='text/css' href='mystyle.css'>"
    }),

    knex('cards').insert(
    {
      deck_id: "1",
      question: "Where in an HTML document is the correct place to refer to an external style sheet?",
      answer: "In the <head> section"
    }),

     knex('cards').insert(
    {
      deck_id: "1",
      question: "Which HTML attribute is used to define inline styles?",
      answer: "style"
    }),
        
    knex('cards').insert(
    {
      deck_id: "2",
      question: "Which doctype is correct for HTML5?",
      answer: "<!DOCTYPE html>"
    }),

    knex('cards').insert(
    {
      deck_id: "2",
      question: "Which HTML5 element is used to specify a footer for a document or section?",
      answer: "<footer>"
    }),

     knex('cards').insert(
    {
      deck_id: "2",
      question: "What does HTML stand for?",
      answer: "Hyper Text Markup Language"
    }),
        
    knex('cards').insert(
    {
      deck_id: "2",
      question: "What is the correct HTML element for inserting a line break?",
      answer: "<br>"
    }),

      knex('cards').insert(
    {
      deck_id: "3",
      question: "Which doctype is correct for HTML5?",
      answer: "<!DOCTYPE html>"
    }),

    knex('cards').insert(
    {
      deck_id: "3",
      question: "Which HTML5 element is used to specify a footer for a document or section?",
      answer: "<footer>"
    }),

     knex('cards').insert(
    {
      deck_id: "3",
      question: "What does HTML stand for?",
      answer: "Hyper Text Markup Language"
    }),
        
    knex('cards').insert(
    {
      deck_id: "3",
      question: "What is the correct HTML element for inserting a line break?",
      answer: "<br>"
    })
    
   );
};	