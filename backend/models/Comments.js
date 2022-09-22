import mongoose from 'mongoose'
const comments = mongoose.Schema({
    timeCommented:String,
    dateCommented:String,
    Comment:String
})

export default mongoose.model('Comment',comments)