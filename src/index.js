const express = require('express');
const app = express();
const path = require('path');

// Configuracion
app.set('port', 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rutas
app.use(require('./routes'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Servidor
app.listen(app.get('port'), () => {
  console.log("Servidor ejecutandose", app.get('port'))
})