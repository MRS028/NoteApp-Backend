import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect('mongodb+srv://user28:Rifat12005028@cluster0.q3w3t.mongodb.net/note-app?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Connected to momgodb using Mongoose")
    server = app.listen(PORT,()=>{
        console.log(`Server is running on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error);
  }
}

main()