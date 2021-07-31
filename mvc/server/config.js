module.exports = {
  port: process.env.PORT || 8080,
  db: {
    prod: process.env.DATABASE_URL,
    test: process.env.DATABASE_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  jwt: {
    secret: 'development_secret',
    expiry: '7d'
  }
};
