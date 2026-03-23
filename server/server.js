import express from 'express';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const app = express()

app.get('/', (req, res)=>{
  res.send("API run ho rhi hai :))");
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});