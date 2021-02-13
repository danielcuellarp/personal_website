const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user')

// recibe: usuario, callback
passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null,user);
})

// Crear Usuario
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const existsUser = await User.findOne({email: email})
  if (existsUser){
    console.log(existsUser.email)
    return done(null, false, req.flash('signupMessage', 'El email ya esta registrado')) 
  } else {
    const newUser = new User()
    newUser.email = email
    newUser.password = newUser.encryptPassword(password)
    await newUser.save()
    done(null, newUser)
  }
}))

// Validar Usuario
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    done(null, false, req.flash('loginMessage', 'Usuario no encontrado'))
  } else if(!user.comparePassword(password)) {
    done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'))
  } else {
    //console.log(user)
    done(null, user)
  }
}));