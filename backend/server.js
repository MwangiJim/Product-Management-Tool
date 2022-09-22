import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Issues from './models/Issues.js'
import Comments from './models/Comments.js'

const app = express()
const PORT = 3500;

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/issuestracker')
.then((res)=>console.log('Db successfully Connected'))
.catch((err)=>console.log(err.message))

app.get('/issues',async(req,res)=>{
    const issuesCreated = await Issues.find();
    if(!issuesCreated){
        return res.status(400).json({"message":"No Issues Found"})
    }
    else{
        res.status(200).json({"message":issuesCreated})
        console.log(issuesCreated)
    }
})

app.post('/issues',async(req,res)=>{
    const {title,description,choice,priority,timeCreated,duration} = req.body;

    if(!title||!description){
        return res.status(400).json({"message":"All inputs needed"})
    }else{
        const newIssue = await Issues.create({
            Title:title,
            Description:description,
            IssuedTo:choice,
            Priority:priority,
            TimeCreated:timeCreated,
            Duration:duration
        })
        res.status(201).json({"message":newIssue})
        console.log(newIssue)
    }
})

app.get('/comments',async(req,res)=>{
    const commentsFound = await Comments.find();
    if(!commentsFound){
        return res.status(400).json({"message":"No messages were Found"})
    }
    else{
        res.status(200).json({"message":commentsFound})
    }
})

app.post('/comments',async(req,res)=>{
    const{time,comment,date} = req.body;
    if(!comment){
        return res.status(400).json({"message":"No comment Found"})
    }else{
        const newComment = await Comments.create({
            timeCommented:time,
            dateCommented:date,
            Comment:comment
        })

        res.status(201).json({"message":newComment})
        console.log(newComment)
    }
})
app.all("*",(req,res)=>{
    res.status(404).json({"message":"Page not Found"})
})
app.listen(PORT,()=>console.log(`App is Running on port ${PORT}`))