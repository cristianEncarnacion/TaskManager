import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/work");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error al conectarse a la base de datos", error);
  }
};
