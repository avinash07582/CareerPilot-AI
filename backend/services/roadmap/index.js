import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import roadmapRouter from "./routes/roadmap.routes.js"


dotenv.config()

const app = express()
app.use(express.json())


const PORT = process.env.PORT || 6002

// app.get("/", (req, res) => {
//     return res.status(200).json({ message: "hello fromm roadmap service " })
// })
app.use("/",roadmapRouter)




app.listen(PORT, () => {
    console.log(`connect to the  roadmap port:${PORT}`);
    connectDB()
    

})

