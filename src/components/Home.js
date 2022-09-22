import React from 'react'
import styled from 'styled-components'
import IssueInfoDisplay from './IssueInfoDisplay'
import ViewIssues from './ViewIssues'
import { useSelector } from 'react-redux'

const Home = () => {
    let{Issue}=useSelector((state)=>state.issueReducer)
    const[Form,setForm]=React.useState({
        title:"",
        description:"",
        Duration:""
    })
    const[Options,setOptions]=React.useState({
        choice:'',
        first:"Derrick",
        second:"Nina Myers",
        third:"Kiefer Sutherland",
        fourth:"MaryAnn",
        fifth:"Lynnette",
        sixth:'Jimmy Mwangi',
        seventh:"CJ",
        eigth:"Margaret",
        ninth:"Fabian",
        tenth:"Caleb",
    })
    const HandleInput=(e)=>{
        setForm((prevForm)=>{
            return{
                ...prevForm,
                [e.target.name]:e.target.value
            }
        })
    }
    const HandleSelection=(e)=>{
        setOptions((prevState)=>{
            return{
                ...prevState,
                [e.target.name]:e.target.value
            }
        })
    }
    const[Priority,setPriority]=React.useState({
        chosenpriority:"",
        level1:"high",
        level2:"medium",
        level3:"low"
    })
    //console.log(`Choice is ${Options.choice} && priority is ${Priority.chosenpriority}`)
    const HandlePriority=(e)=>{
        setPriority((prevPriority)=>{
            return{
                ...prevPriority,
                [e.target.name]:e.target.value
            }
        })
    }
    const HandleForm=async(event)=>{
        event.preventDefault()
        if(Form.description,Form.title,Options.choice,Priority.chosenpriority){
            await fetch('http://localhost:3500/issues',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                title:Form.title,
                description:Form.description,
                choice:Options.choice,
                priority:Priority.chosenpriority,
                timeCreated:new Date().toString(),
                duration:Form.Duration
            })
         })
        }
    }
  return (
    <Container>
    <TopSection>
      <img src='./bug.png'/>
        <div className='left__side'>
           <h2>Project Management Tool</h2>
            <p>Track Project Bugs</p>
        </div>
    </TopSection>
     <Box>
     <form onSubmit={HandleForm}>
        <h3>Bug Tracker</h3>
        <label>Title</label>
        <br/>
        <input
         type={'text'}
         placeholder='Title'
         value={Form.title}
         name='title'
         onChange={HandleInput}
        />
        <label>Description</label>
        <br/>
        <input
         type={'text'}
         placeholder='Description of Issue'
         value={Form.description}
         name='description'
         onChange={HandleInput}
        />
        <br/>
        <label>Assign To</label>
        <br/>
         <select name='choice' onChange={HandleSelection} value={Options.choice}>
            <option value={'Add Contributor'}>Add Contributor</option>
            <option value={Options.first}>Derrick</option>
            <option value={Options.second}>Nina Myers</option>
            <option value={Options.third}>Kiefer Sutherland</option>
            <option value={Options.fourth}>MaryAnn</option>
            <option value={Options.fifth}>Lynnette</option>
            <option value={Options.sixth}>Jimmy Mwangi</option>
            <option value={Options.seventh}>CJ</option>
            <option value={Options.eigth}>Margaret</option>
            <option value={Options.ninth}>Fabian</option>
            <option value={Options.tenth}>Caleb</option>
         </select>
        <br/>
        <label>Priority</label>
        <br/>
        <select name='chosenpriority' onChange={HandlePriority} value={Priority.chosenpriority}>
            <option>Set Level</option>
            <option value={Priority.level1}>High</option>
            <option value={Priority.level2}>Medium</option>
            <option value={Priority.level3}>Low</option>
        </select>
        <br/>
        <label>Expected Duration</label>
        <br/>
        <input
         type={'number'}
         placeholder='Enter Duration to take Fixing Bug(hrs)'
         value={Form.Duration}
         name='Duration'
         onChange={HandleInput}
        />
        <button>Add Issue</button>
      </form>
      <ViewIssues/>
     </Box>
      <button className='btn'>Current Issues</button>
     {Issue.TitleHead &&  <IssueInfoDisplay/>}
    </Container>
  )
}

export default Home
let Container = styled.div`
 width:100%;
 height:100vh;
 background-color:#f4f4f4;
 align-items:center;
 .btn{
    background:#fff;
    outline:none;
    border:none;
    color:purple;
    padding:12px 35px;
    cursor:pointer;
    border-radius:6px;
    box-shadow:4px 4px 10px #333;
    margin:2% 0;
 }
 h2{
    color:purple;
    text-align:center;
 }
 form{
    width:450px;
    height:max-content;
    background-color:#fff;
    box-shadow:3px 3px 8px #333;
    padding:10px 15px;
    input{
        width:90%;
        height:45px;
        border:none;
        background:#f4f4f4;
        outline:none;
        padding:0 10px;
        border-radius:6px;
        margin-top:2%;
    }
    select{
        width:95%;
        height:45px;
        border:none;
        background:#f4f4f4;
        outline:none;
        padding:0 10px;
        border-radius:6px;
        margin-top:2%;
        option{
            padding:20px 12px;
            
        }
    }
    button{
        background-color:purple;
        color:#fff;
        padding:10px 15px;
        border:none;
        outline:none;
        border-radius:6px;
        margin:2% 0;
        cursor:pointer;
    }
 }
`
let Box = styled.div`
 display:flex;
 justify-content:space-between;
 align-items:center;
 margin:0 3%;
`
let TopSection = styled.div`
 display:flex;
 justify-content:left;
 align-items:center;
 width:100%;
 padding:10px 6px;
 background:purple;

 img{
    width:50px;
    height:50px;
  }
 .left__side{
    color:#fff;
    margin:0 2%;
    display:block;
    h2{
        color:#fff;
    }
    text-align:left;
 }
`