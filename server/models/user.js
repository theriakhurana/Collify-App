import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type : String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type : String,
    required : true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type : String,
    enum : ['student', 'teacher'],
    required : true
  },
}, {timestamps : true});

export default mongoose.model('User', userSchema);