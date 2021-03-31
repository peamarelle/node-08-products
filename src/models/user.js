const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    index: true
  },
  birthdate: Date,
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE',
    enum: ['USER_ROLE', 'ADMIN_ROLE']
  },
  enable: {
    type: Boolean,
    required: true,
    default: true
  }
},
{timestamps: true}
);
userSchema.plugin(uniqueValidator, {message: 'already exists in DB'});
userSchema.plugin(mongoosePaginate);

module.exports = model('users', userSchema)