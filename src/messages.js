// Probando como independizar la parte de los mensajes del index.js

function messages(req, res, next, app){
  app.locals.signupMessage = req.flash('signupMessage')
  next()
}

module.exports = messages;
