const express = require('express');
const router = express.Router();
const passport = require('passport');

// Variable de datos que se comparte para parametrizar la pagina
const datos = { 
  title: 'Daniel Cuéllar P', 
  anio: new Date().getFullYear()
}

// Home
router.get('/', (req, res) => {
  res.render('index', datos);
})

// Pagina de contacto
router.get('/contact', (req, res) => {
  res.render('contact',datos);
})

// Pagina de la app (donde estaran las funcionalidades que se iran creando)
router.get('/app', (req, res, next) => {
  res.render('indexApp',datos);
})

// Registro de usuario
router.get('/signup', (req, res, next) => {
  res.render('signup',datos);
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/app',
  failureRedirect: '/signup',
  passReqToCallback: true
}))

// Login de usuario
router.get('/login', (req, res, next) => {
  res.render('login',datos);
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/app',
  failureRedirect: '/login',
  passReqToCallback: true
}))

module.exports = router;