const mongoose = require('mongoose')
const bcyrpt = require('bcrypt-nodejs');
const { Schema } = mongoose

const userSchema = new Schema({
  email: String,
  password: String
})

// Cifrar la contraseña 
userSchema.methods.encryptPassword = (password) => {
  return bcyrpt.hashSync(password, bcyrpt.genSaltSync(10))
}

// Compara si la contraseña es correcta (compara el dato cifrado, no se necesita descifrar)
userSchema.methods.comparePassword = (password) => {
  return bcyrpt.compareSync(password, this.password);
}

module.exports = mongoose.model('users', userSchema);