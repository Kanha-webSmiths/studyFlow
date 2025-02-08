import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// PRIMARY MIDDLEWARES
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhose:5173",
  credentials: true,
}))
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


// TEST ROUTE
app.get('/', (req, res) => {
  res.status(200).json({msg: "Server is running..."})
})

// ROUTES




export { app }