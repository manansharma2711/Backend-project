import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser" // used to access or set cookies from browser

const app= express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))  // data will come from json
app.use(express.urlencoded({extended:true,limit:"16kb"})) // data coming from url
app.use(express.static("public")) //things such as favicons, pdfs etc that i want to store in my server

app.use(cookieParser())


export {app}