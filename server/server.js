import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({path: '../.env'});
connectDB();

const app = express()

app.get('/', (req, res)=>{
  res.send("API run ho rhi hai :))");
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});