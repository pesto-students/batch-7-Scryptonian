module.exports = {
  PORT: process.env.PORT || 8000,
  google: {
    callbackURL: 'http://localhost:8000/auth/google/redirect',
    clientId: '536317043008-s361mrq6523epav5tn9au5ubuc366ip7.apps.googleusercontent.com',
    secretKey: 'QNa20Vv7XtVw8HycTj_qMYGx',
  },
  mongo: {
    connectionString:
      'mongodb+srv://admin:FRsojwU0AjxQyWhS@scryptonian-ghufh.mongodb.net/test?retryWrites=true&w=majority',
  },
  session: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    keys: ['onion'],
  },
};
