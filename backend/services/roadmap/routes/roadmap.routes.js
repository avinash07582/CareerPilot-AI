import express from "express"
import { generateRoadMap, getAllRoadmap, getRoadmapbyId } from "../controllers/roadmap.controller.js"

 

const roadmapRouter = express.Router()

roadmapRouter.post("/generate" , generateRoadMap)

roadmapRouter.get("/all" ,getAllRoadmap )

roadmapRouter.get("/:id",getRoadmapbyId)

export default roadmapRouter