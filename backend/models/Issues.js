import mongoose from "mongoose";

const Issues  = mongoose.Schema({
    Title:String,
    Description:String,
    TimeCreated:String,
    Priority:String,
    IssuedTo:String,
    Duration:Number
})

export default mongoose.model('Issue',Issues)