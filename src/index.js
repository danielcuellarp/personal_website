const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path') 
const session = require('express-session')
const flash = require('connect-flash')
const app = express()
require('./database') // conexion a la bd
require('./passport/local-auth') // estrategia de conexion

// Configuracion
app.set('port', process.env.PORT || 4000) 
app.set('views', path.join(__dirname, 'views')) // ubicacion de las vistas
app.set('view engine', 'ejs') // motor de plantillas

// Middlewares
// recordar que el orden importa, la siguiente linea utiliza la anterior en algunos casos
app.use(morgan('dev')) // logger de morgan
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'ClaveSecreta',
  resave: false,
  saveUninitialized: false
})) // parametrizar la session
app.use(flash()) // modulo que expone los mensajes en las paginas
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  app.locals.signupMessage = req.flash('signupMessage')
  next()
}) // middleware creado para reutilizar los mensajes, los expone como variables globales en el servidor
app.use(require('./routes')) // ubicacion de las rutas
app.use(express.static(path.join(__dirname, 'public'))) // set carpeta publica

// Servidor
app.listen(app.get('port'), () => {
  console.log("Servidor ejecutandose", app.get('port'));
})