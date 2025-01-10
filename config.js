
const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  title:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  surname:{
    type:String,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  phone:{
    type: Number,
    required:true
  },
  id:{
    type: Number,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  compagny:{
    type:String,
    required:false
  }
 
},{timestamps:true});

const User = mongoose.model('User',userSchema);
module.exports = User;
