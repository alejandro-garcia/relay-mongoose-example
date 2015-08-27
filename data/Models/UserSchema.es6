import mongoose from 'mongoose';

import Hobby from './HobbySchema.es6';

let UserSchema = new mongoose.Schema({
  id: { type:String, required:true, unique:true, index:true, default:mongoose.Types.ObjectId },
  name: String,
  surname: String,
  age: Number,
  hobbies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Hobby'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  type: String
});

UserSchema.set('toJSON', { getters: true });

let User = mongoose.model('User', UserSchema);

exports.User = User;

exports.getUserById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    User.findById(id).exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
};

exports.updateUser = (user) => {
  return new Promise((resolve, reject) => {
    user.save((err, res) => {
      err ? reject(err): resolve(res);
    });
  });
};

exports.getListOfUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}).populate('hobbies friends').exec((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

exports.saveNewUser = (root, {name, surname, age}) => {
  var newUser = new User({name:name, surname:surname, age:age});

  return new Promise((resolve, reject) => {
    newUser.save((err, res) => {
      err ? reject(err): resolve(res);
    });
  });
};

exports.updateUser = (root, {name, surname, age, id}) => {
  let modify = {};
  name ? modify.name = name : null;
  surname ? modify.surname = surname : null;
  age ? modify.age = age : null;
  return new Promise((resolve, reject) => {
    User.update({id:id}, modify, (err, res) =>{
      User.findById(id, (err, res) => {
        err ? reject(err): resolve(res);
      });
    });
  });
};