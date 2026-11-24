
// current user naiklna hai find krna hai
// req.user se sarta data hoga toh usme se lelenge use model se sseion se le rhe redis se  

export const getCurrentUser = async(req,res)=>{
    try {
        return res.status(200).json({
            success:true,
            user:req.user,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}