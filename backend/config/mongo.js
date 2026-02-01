import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const connectMongo = async () => {
  try {
    // console.log("mongo: ", process.env.MONGO_URI);
    // await mongoose.connect(process.env.MONGO_URI, {
    //   family: 4,
    //   directConnection: true,
    //   serverSelectionTimeoutMS: 5000,
    // });
    console.log(process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } 
  catch (error) {
    console.error("Mongo connection failed", error);
    process.exit(1);
  }
  
};
