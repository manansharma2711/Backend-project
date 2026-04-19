// require('dotenv').config({path: './env'})
//  We can introduce .env by using import statement too
// Else require statement written above works completely fine

import dotenv from "dotenv"; // but we need to config it
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()

.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: $
            {process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB Connection failed!! ",err); 
})





/*
import express from "express"
const app=express()

( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERROR: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    } catch(error){
        console.error("ERROR: ", error)
        throw err
    }
})()

*/

