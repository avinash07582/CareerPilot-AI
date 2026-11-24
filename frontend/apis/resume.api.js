
import api from "../src/utlis/axios.js"

export const getResume = async ()=>{
    try {
        const response = await api.get("/api/resume/get-resume")
       
        return response.data
        

    } catch (error) {
        console.log(error.message);
        return  null
        
        
    }
}


