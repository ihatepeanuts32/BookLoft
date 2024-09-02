import mongoose from 'mongoose';
import dontenv from 'dotenv'

dontenv.config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!)
    console.log("Database connected successfully")

  } catch(err) {
    console.log("Failed to connect to database", err)
  }
}

export default connectToDB;