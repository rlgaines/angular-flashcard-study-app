module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/flashcards'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
