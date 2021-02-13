const mongoose = require('mongoose')
const { mongodb } = require('./keys')

mongoose.connect(mongodb.uri,{
  useUnifiedTopology: true, // porque esta Deprecated
  useNewUrlParser: true // porque esta Deprecated
})
  .then(db => console.log('Base de datos conectada'))
  .catch(err => console.error(err))