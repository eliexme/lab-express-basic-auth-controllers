const session = require('express-session');
const MongoStore = require('connect-mongo')

module.exports = app => {
  
  app.set('trust proxy', 1);

  // use session
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 600000 // 1 hour
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-basic-auth",
        dbName: 'lab-express-basic-auth', // Agrega este campo
    })
    })
  );
};