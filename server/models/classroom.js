import mongoose from "mongoose";
import { nanoid } from "nanoid";

const generateJoinCode = ()=>{
  return nanoid(6).toUpperCase();
}

const classroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  students : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  joinCode: {
    type: String,
    unique: true,
    default: generateJoinCode,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Classroom', classroomSchema);