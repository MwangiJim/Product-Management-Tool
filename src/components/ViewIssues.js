import React, { useEffect } from 'react'
import styled from 'styled-components'
import Issue from './Issue'

const ViewIssues = () => {
    const[issues,setissues]=React.useState([])
    useEffect(()=>{
        let FetchIssues = async()=>{
            await fetch('http://localhost:3500/issues')
            .then((res)=>res.json())
            .then((data)=>{
              // console.log(data)
               let IssuesFetched = data.message.map((item)=>{
                return(
                    {
                        description:item.Description,
                        issuedto:item.IssuedTo,
                        priority:item.Priority,
                        timecreated:item.TimeCreated,
                        title:item.Title,
                        duration:item.Duration
                    }
                )
               })
               setissues(IssuesFetched)
            })
            .catch((err)=>{
                console.log(err.message)
            })
        }
        return ()=>FetchIssues()
    },[1])
    //console.log(issues)
  return (
    <Container>
       <h3>Issues</h3>
       <Header>
        <small className='small'>Issue Title</small>
        <small className='bigger'>DESCRIPTION</small>
        <small className='time'>TIMECREATED</small>
        <small className='smaller'>ISSUE AUTHOR</small>
       </Header>
       {/*Issues Mappped Here.... */}
      <div className='issues'>
        {issues.map((item,i)=>{
            return(
                <Issue
                 key={i}
                 titlehead = {item.title}
                 desc = {item.description}
                 time = {item.timecreated}
                 assignedto = {item.issuedto}
                 priority = {item.priority}
                 duration  = {item.duration}
                />
            )
        })}
      </div>
    </Container>
  )
}

export default ViewIssues
let Container = styled.div`
 width:100%;
 height:60vh;
 background-color:#fff;
 border-radius:5px;
 flex-basis:60%;
 border-radius:6px;
 box-shadow:3px 3px 6px #333;
 h3{
    padding:10px 0;
 }
 .issues{
    height:48vh;
    max-height:48vh;
    overflow-y:scroll;
    ::-webkit-scrollbar{
        width:0;
    }
 }
`
let Header = styled.div`
 display:flex;
 justify-content:space-between;
 align-items:center;
 border-top:2px solid #333;
 border-bottom:2px solid #333;
 background-color:#f4f4f4;
 padding:10px 3px;
 small{
    font-size:11px;
 }
 .small{
    flex-basis:10%;
    text-transform:uppercase;
 }
 .bigger{
    flex-basis:53%;
 }
 .smaller{
    flex-basis:10%;
 }
 .time{
    flex-basis:10%;
 }
`