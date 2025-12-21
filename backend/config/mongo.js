import mongoose from "mongoose";

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } 
  catch (error) {
    console.error("Mongo connection failed", error);
    process.exit(1);
  }
  
};
