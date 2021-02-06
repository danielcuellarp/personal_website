const express = require('express')
const morgan = require('morgan')
const path = require('path') 
const app = express()

// Configuracion
app.set('port', 4000) 
app.set('views', path.join(__dirname, 'views')) // ubicacion de las vistas
app.set('view engine', 'ejs') // motor de plantillas
app.use(morgan('dev')) // logger de morgan
app.use(require('./routes')) // ubicacion de las rutas
app.use(express.static(path.join(__dirname, 'public'))) // set carpeta publica

// Servidor
app.listen(app.get('port'), () => {
  console.log("Servidor ejecutandose", app.get('port'));
})

