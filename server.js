const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const routes=require('./routes/toDoRoutes')
require('dotenv').config()

const app=express()
//mongoose.connect(process.env.MONGO_URI)
app.use(express.json())
app.use(cors())
app.use(routes)
const PORT=process.env.PORT || 5000


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await console.log('mongodb connected');

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();