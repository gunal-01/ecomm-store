// const express = require('express'); (this is the primitive method to import express) for building api
import express from 'express';  // here we imported express through changing the [pkg.json] file by adding ["type": 'module';]
import dotenv from "dotenv"; // imports for allowing us to load environment variables from a .env file into process.env
import { connectDB } from './config/db.js'; //manages the connection to MongoDB database through the function connectDB from another file(db.js)
import productRoutes from "./routes/product.route.js"; // routes

dotenv.config(); // loads env varibles from .env file into process.env. This is necessary to use variables like MONGO_URI securely.
const app = express();  // creates an instance of an Express application, which will be used to handle HTTP requests and responses
const PORT = process.env.PORT || 5000
app.use(express.json()); // allows us to accept the JSON data in the req.body [Especially this acts as a **middleware**]

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});