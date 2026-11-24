import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import interviewRouter from "./routes/interview.route.js"


dotenv.config()

const app = express()
app.use(express.json())


const PORT = process.env.PORT || 6004

app.get("/", (req, res) => {
    return res.status(200).json({ message: "hello fromm interview service " })
})

app.use("/",interviewRouter)




app.listen(PORT, () => {
    console.log(`connect to the  interview port:${PORT}`);
    connectDB()
    
    

})

