

import redis from "../../shared/redis/redis.js";


export const isAuth = async (req,res,next)=>{
    try {
        // cookies se sessionid naikal

    const sessionId = req.cookies?.session;
    console.log("Cookies received:", req.cookies);
console.log("Session ID:", req.cookies?.session);
   
  if(!sessionId){
    return res.status(401).json({
        message:"Unauthrosied"
    })
}
 // ab sessionid se user ke data
 const session =  await redis.get(`session:${sessionId}`)
   if(!session){
    return res.status(401).json({
        message:"Session expired"
    })
}

req.user = JSON.parse(session)
next()


        
    } catch (error) {
        return res.status(500).json({
        message:error.message
    })
        
    }
}