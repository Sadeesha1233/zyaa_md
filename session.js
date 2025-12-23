// session.js

const session = require('express-session');

// Session configuration
const sessionMiddleware = session({
    secret: 'oya-secret-key',        // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }      // 1 hour in milliseconds
});

module.exports = sessionMiddleware;
