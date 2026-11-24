import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import billingRouter from "./routes/billing.route.js"



dotenv.config()

const app = express()
app.use(express.json())


const PORT = process.env.PORT || 6005

app.get("/", (req, res) => {
    return res.status(200).json({ message: "hello fromm billing service " })
})
app.use("/",billingRouter)






app.listen(PORT, () => {
    console.log(`connect to the  billing port:${PORT}`);
    connectDB()
    
    

})

