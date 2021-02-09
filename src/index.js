const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path') 
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
require('./database')
require('./passport/local-auth')

// Configuracion
app.set('port', process.env.PORT || 4000) 
app.set('views', path.join(__dirname, 'views')) // ubicacion de las vistas
app.set('view engine', 'ejs') // motor de plantillas
app.use(morgan('dev')) // logger de morgan
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'ClaveSecreta',
  resave: false,
  saveUninitialized: false
})) // parametrizar la session
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage')
  next()
})

app.use(require('./routes')) // ubicacion de las rutas
app.use(express.static(path.join(__dirname, 'public'))) // set carpeta publica


// Servidor
app.listen(app.get('port'), () => {
  console.log("Servidor ejecutandose", app.get('port'));
})

