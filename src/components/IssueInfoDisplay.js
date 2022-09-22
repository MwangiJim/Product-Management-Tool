import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import CommentBox from './CommentBox'
import moment from 'moment'

const IssueInfoDisplay = () => {
    let{Issue}=useSelector((state)=>state.issueReducer)
    const[Text,setText]=React.useState({
        comment:""
    })
    function HandleComment(e){
        setText((prevComment)=>{
            return{
                ...prevComment,
                [e.target.name]:e.target.value
            }
        })
    }
    //console.log(Issue)
    const SubmitComment=async()=>{
       await fetch('http://localhost:3500/comments',{
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            time:new Date().toLocaleTimeString(),
            date:new Date().toDateString(),
            comment:Text.comment
        })
       })
    }
let[Comments,setComments]=React.useState([])
    useEffect(()=>{
       let FetchComments =async()=>{
          await fetch('http://localhost:3500/comments')
          .then((res)=>res.json())
          .then((data)=>{
            //console.log(data)
            let fetchedComments = data.message.map((item)=>{
                return(
                    {
                        comment:item.Comment,
                        date:item.dateCommented,
                        time:item.timeCommented
                    }
                )
            })
            setComments(fetchedComments)
          })
          .catch((err)=>{
            console.log(err.message)
          })
       }
       return ()=>FetchComments();
    },[1])
    console.log(Comments)
  return (
    <Container>
      <h3>Selected Issue Info</h3>
      <br/>
       <Content>
            <LeftSide>
               <div className='first__row'>
                  <div className='left'>
                        <p>Issue Title</p>
                        <h3>{Issue.TitleHead}</h3>
                  </div>
                  <div className='center'>
                       <p>Author</p>
                       <h3>{Issue.AssignedTo}</h3>
                  </div>
                  <div className='right'>
                       <p>Description</p>
                       <h3>{Issue.Description}</h3>
                  </div>
               </div>
               <div className='second__row'>
                 <div className='left'>
                    <p>Status</p>
                    <span>{Issue.Priority === 'high'||'medium'?'Unresolved':'Resolved'}</span>
                 </div>
                 <div className='center'>
                    <p>Priority</p>
                    <span>{Issue.Priority}</span>
                 </div>
                 <div className='right'>
                    <p>Type</p>
                    <span>Issue</span>
                 </div>
                 <div className='fourth__row'>
                <p>Time Assigned</p>
                <small>{Issue.Period}</small>
                <br/>
                <small>{`To be Fixed in ${Issue.Duration} ${Issue.Duration ===1? 'hr':"hrs"}`}</small>
               </div>
               </div>
               <hr></hr>
               <div className='third__row'>
                 <p>Assigned devs</p>
                 <small>{Issue.AssignedTo}</small>
               </div>
            </LeftSide>
          <RightSide>
          <p>Comments</p>
          <br/>
          {/*Map Comments here*/}
           <div className='comment_box'>
              {Comments.map((data,i)=>{
                return(
                    <CommentBox
                    key={i}
                     Date = {data.date}
                     Time = {data.time}
                     Comment = {data.comment}
                    />
                )
              })}
           </div>
           <div className='input__box'>
            <input
             type={'text'}
             placeholder='Enter Comment'
             value={Text.comment}
             name='comment'
             onChange={HandleComment}
            />
            <button onClick={SubmitComment}>Comment</button>
           </div>
        </RightSide>
       </Content>
    </Container>
  )
}

export default IssueInfoDisplay
let Container = styled.div`
 width:95%;
 height:max-content;
 border-radius:6px;
 margin:0 3%;
 padding:7px;
 background:#fff;
 box-shadow:4px 4px 12px #333;
`
let Content = styled.div`
 display:flex;
 justify-content:space-between;
`
let LeftSide =styled.div`
 flex-basis:50%;
 border-radius:8px;
 box-shadow:4px 4px 8px #333;
 padding:5px;
 p{
    text-transform:uppercase
}
 .first__row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:4% 0;
    p{
        text-transform:uppercase
    }
    h3{
        font-size:15px;
        font-weight:300;
    }
    .left{
        display:block;
        flex-basis:18%;
    }
    .center{
        display:block;
        flex-basis:20%;
    }
    .right{
        display:block;
        flex-basis:45%;
    }
 }
 .second__row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:4% 0;
    text-align:left;
    span{
        background-color:rgb(106, 75, 179);
        height:20px;
       width:max-content;
       padding:2px 5px;
        color:#fff;
        display:block;
        border-radius:15px;
        text-align:center;
    }
    p{
        text-transform:uppercase
    }
    .left{
        display:block;
        flex-basis:18%;
    }
    .center{
        display:block;
        flex-basis:20%;
    }
    .right{
        display:block;
        flex-basis:20%;
    }
 }
`
let RightSide = styled.div`
flex-basis:46%;
box-shadow:2px 2px 5px #333;
padding:20px 12px;
border-radius:5px;
.input__box{
    display:flex;
    justify-content:space-between;
    align-items:center;
    height:40px;
    width:100%;
    background:#fff;
    border:1px solid #333;
    border-radius:9px;
    overflow:hidden;
    input{
        background:transparent;
        height:40px;
        width:100%;
        outline:none;
        border:none;
        padding:0 5px;
    }
    button{
        padding:14px 30px;
        color:#fff;
        cursor:pointer;
        background-color:purple;
        border:none;
    }
}
`