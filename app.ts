import express from "express";
import connectDB from "./database/db";
import dotenv from 'dotenv';
import routes from "./routes";
import mongoose from 'mongoose';
mongoose.set('strictPopulate', false);

const app = express();

async function main() {
  dotenv.config();
  await connectDB();

  app.use(express.json()); // For parsing application/json

  // Middleware to parse URL-encoded requests
  app.use(express.urlencoded({ extended: true }));
  app.use("/v0", routes)
 
  // Create server
  const port = process.env.PORT;
  app.listen(port, (_error?: any) => { // Use error as optional argument
    if (_error) {
      return console.error('Error: ', _error);
    }
    
    const appBaseUrl = 'http://localhost:' + port;
    console.log('\x1b[33m%s\x1b[0m', `🚀🚀 Running @ '${appBaseUrl}'`);
  });
}

main();
