import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("CONNECTED TO MONGODB!");
  } catch (error) {
    console.error("Error connecting to mongodb", error);
    process.exit(1);
  }
}

export default connectDB;
