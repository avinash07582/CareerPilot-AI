// data me interview ka typemlike hr ot technical and role backend fronend uiux like that use resumeresume

import llm from "../config/llm.js";
import hrInterviewPrompt from "../prompts/hrInterviewPrompt.js"
import technicalInterviewPrompt from "../prompts/technicalInterviewPrompt.js"

 export const  interviewAgent = async(data)=>{


  try {
      const prompt = data.type?.toLowerCase() === "hr" ? hrInterviewPrompt(data):technicalInterviewPrompt(data);

   const response = await llm.invoke(prompt)

   const cleaned = response.content
   .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        return JSON.parse(cleaned)

    
  } catch (error) {
    console.log("Interview Agent Parse Error");
    console.log(response.content);

    throw new Error("Failed to generate interview questions.");
    
  }











 }