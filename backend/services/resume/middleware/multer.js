import fs from "fs"
import multer from "multer"

const uploadPath = "../uploads"
// ab check krna hai existing path exist or by fs module that in node js

if(!fs.existsSync(uploadPath)){
    // gar path nhe hai toh bna dema mdie se
    fs.mkdirSync(uploadPath)

}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath)
    },
    filename:(req,file,cb)=>{
        cb(null ,file.originalname)
    }
 })   
// checks wheather the file is pdf or not


const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "application/pdf"){
        cb(null,true)
        // true ka mtlb file uplaod hoga ya nhe
    }else{
        cb(new Error("Only PDF files are allowed"),false)
    }
}

  export const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:20*1024*1024,
    }
})


