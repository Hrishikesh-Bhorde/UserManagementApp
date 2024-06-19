import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import otpRoutes from "./routes/otp.routes.js"
import userRoutes from "./routes/user.routes.js"
import cors from "cors"; 

const app = express()
app.use(cors())
app.use(express.json())

dotenv.config()

const PORT = process.env.PORT || 4000

const dbConnect = "mongodb://localhost:27017/userManagement"

app.get('/', (req, res) => {
    res.send('Euuu Hello').json()
})

// Connect MongoDB
try {

    mongoose.connect(dbConnect, {
    });
    console.log("Database Connection Successfull");
    
  } catch (error) {
    console.error(error);
    
  }

  // Importing Routes
  app.use('/auth', otpRoutes);
  app.use('/user', userRoutes);



  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })