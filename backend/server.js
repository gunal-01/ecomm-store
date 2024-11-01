// const express = require('express'); (this is the primitive method to import express) for building api
import express from 'express';  // here we imported express through changing the [pkg.json] file by adding ["type": 'module';]
import dotenv from "dotenv"; // imports for allowing us to load environment variables from a .env file into process.env
import { connectDB } from './config/db.js'; //manages the connection to MongoDB database through the function connectDB from another file(db.js)
import Product from "./models/product.model.js";
dotenv.config(); // loads env varibles from .env file into process.env. This is necessary to use variables like MONGO_URI securely.
const app = express();  // creates an instance of an Express application, which will be used to handle HTTP requests and responses

app.use(express.json()); // allows us to accept the JSON data in the req.body [Especially this acts as a **middleware**]
app.post("/api/products", async (req, res) => {  // this app.post("/products, async (req, res) => sets up the route handler for GET request to /products. The handler function is asynchronous to allow for the use of await inside.
    
    /*Logic to fetch products from database goes here*/

    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in Create Product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

//  passwd: O43v6VDPGo9WXhud