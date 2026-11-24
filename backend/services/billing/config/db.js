import  mongoose from "mongoose"


const connectDB = async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connect to DB");
        
    } catch (error) {
        console.log("db connection error",error);
        
        
    }


}

export default connectDB