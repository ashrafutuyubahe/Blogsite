

const imageModel= require('../models/imageschema');
const asyncHandler = require("express-async-handler");

const handleFileUpload= asyncHandler(async(req,res)=>{
    try{
        
        if(!req.file){
            return res.status(500).json({error:'No file found'});
        }
        const imageFile= imageModel({
            filename:req.file.filename,
            filepath:req.file.path
        });
    
        const saveImage = await imageFile.save();
        res.status(200).json(saveImage);
    
    

    }
      catch(err){
        console.log(err);
    }
})

module.exports=handleFileUpload;