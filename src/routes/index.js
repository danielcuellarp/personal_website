const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {title: 'Daniel Cuéllar P', anio: new Date().getFullYear()});
})

router.get('/contact', (req, res) => {
  res.render('contact',{title: 'Daniel Cuéllar P - Contact', anio: new Date().getFullYear()});
})

module.exports = router;