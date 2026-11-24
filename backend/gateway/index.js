import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { getCurrentUser } from "./controllers/user.controller.js"
import { isAuth } from "./middleware/isAuth.js"
import { proxyWithHeaders } from "./utlis/proxywithHeaders.js"
dotenv.config()

const app =express()
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(morgan("dev"))
app.use(cookieParser())


const PORT =process.env.PORT ||6000



app.get("/",(req,res)=>{
    return res.status(200).json({message:"hello from gate way"})
})
app.get("/api/me", isAuth, getCurrentUser);

if (process.env.AUTH_SERVICE_URL) {
  app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
}

if (process.env.RESUME_SERVICE_URL) {
  app.use("/api/resume", isAuth, proxyWithHeaders(process.env.RESUME_SERVICE_URL));
}

if (process.env.INTERVIEW_SERVICE_URL) {
  app.use("/api/interview", isAuth, proxyWithHeaders(process.env.INTERVIEW_SERVICE_URL));
}

if (process.env.ROADMAP_SERVICE_URL) {
  app.use("/api/roadmap", isAuth, proxyWithHeaders(process.env.ROADMAP_SERVICE_URL));
}

if (process.env.BILLING_SERVICE_URL) {
  app.use("/api/billing", isAuth, proxyWithHeaders(process.env.BILLING_SERVICE_URL));
}



app.listen(PORT,()=>{
    console.log(`connect to the  gate way port:${PORT}`);
    
})

