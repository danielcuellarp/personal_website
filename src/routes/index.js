const express = require('express');
const router = express.Router();
const passport = require('passport');

const datos = { 
  title: 'Daniel Cuéllar P', 
  anio: new Date().getFullYear()
}

router.get('/', (req, res) => {
  res.render('index', datos);
})

router.get('/contact', (req, res) => {
  res.render('contact',datos);
})

router.get('/app', (req, res, next) => {
  res.render('indexApp',datos);
})

router.get('/signup', (req, res, next) => {
  res.render('signup',datos);
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/app',
  failureRedirect: '/signup',
  passReqToCallback: true
}))

router.get('/signin', (req, res, next) => {

})

router.post('/signin', (req, res, next) => {
  
})

module.exports = router;