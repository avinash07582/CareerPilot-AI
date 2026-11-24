
// pdf  ---->  pdf Storage  ---> text ---> llm ---> agent ---> promt ---> data ---> save mongoDb ---> redis -->pdf delete ---> resume data ( score , missing skills , recommen.)
// sbko assemble krna hai   mongodb aur redis me bhe save kar dneg


import redis from "../../../shared/redis/redis.js"
import { resumeAgent } from "../agents/resume.agents.js"
import extractText from "../config/pdf.js"
import Resume from "../models/resume-model.js"
import fs  from "fs"

export const uploadResume = async (req,res)=>{
     let file;
    try {
         file = req.file 
        // frondend se file lana
        if(!file){
            return res.status(400).json({
                success:false,
                message:"Resume PDFis required"
            })
            }
            console.log(file);
            
        


//   USER ID HEADER JI GATE ME SET KI THI PROXY WITH HEADERS
        const userId =  req.headers["x-user-id"]

 if(!userId){
            return res.status(400).json({
                success:false,
                message:"User Id is required"
            })

        }
        // extrect text wla part

        const resumeText = await extractText(file.path)

        const aiResponse = await resumeAgent(resumeText)

        const resumeData = JSON.parse(aiResponse)

        // agr user dusra resume bhej toh data or db uske ko upadte krnah hai 
        let resume = await Resume.findOne({userId})
         if(resume){
            Object.assign(resume,{
                ...resumeData,
                 extractedText:resumeText
            }
                
            )
            await resume.save()
         } else{
            resume = await Resume.create({
                userId,
                extractedText:resumeText,
                ...resumeData
            })
         }


         await redis.set(`resume:${userId}`,JSON.stringify(resume))

        //  pdf dele mongo aur rdis data lenge

         await fs.unlinkSync(file.path)
         return res.status(200).json({
            success:true,
            message:"Resume Analyzed Succesfully",
            data:resume
         })
        

} catch (error) {
    console.log(error);
    }
    if(file){
        await fs.unlinkSync(file.path)

    }

    return res.status(500).json({
            success:false,
            message:`Resume analysis error `,
            
         })
}

export const getResume = async (req,res)=>{
    try {
         const userId =  req.headers["x-user-id"]
         const cache = await redis.get(`resume:${userId}`)
      
     if(cache){
        return res.status(200).json({
            success:true,
            source:"redis",
            data:JSON.parse(cache)
        })
     }
     const resume = await Resume.findOne({userId})
     if(!resume){
        return res.status(400).json({
            success:false,
            message:"Resume not found"
        })

     }


      await redis.set(`resume:${userId}`,JSON.stringify(resume))
      return res.status(200).json({
            success:true,
            source:"mongodb",
            data:resume
        })

     



         
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success:false,
            message:`Resume fetching error ${error.message}`,
            
         })
        
    }
}