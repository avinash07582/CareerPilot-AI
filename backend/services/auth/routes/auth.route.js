import express from "express"
import { addCoins,login, logOut, useCoins } from "../controllers/auth-controller.js"

const authRouter = express.Router()


authRouter.post("/login",login)
authRouter.delete("/logout",logOut)
authRouter.post("/use-coins",useCoins)
authRouter.post("/add-coins",addCoins)





export default authRouter