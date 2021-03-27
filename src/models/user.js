const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  name: String,
  lastName: String,
  email: String,
  birthdate: Date
},
{timestamps: true}
);

module.exports = model('users', userSchema)