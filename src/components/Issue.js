import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setIssue } from '../redux/reducerSlice'

const Issue = (props) => {
    let dispatch = useDispatch();
    const period = moment(props.time).fromNow();
    const setDisplayIssue=()=>{
        dispatch(setIssue({
            TitleHead:props.titlehead,
            Description:props.desc,
            Period:period,
            AssignedTo:props.assignedto,
            Priority:props.priority,
            Duration:props.duration
        }))
    }
  return (
    <Container onClick={setDisplayIssue}>
      <small className='small'>{props.titlehead}</small>
      <small className='bigger'>{props.desc}</small>
      <small className='time'>{period}</small>
      <small className='smaller'>{props.assignedto}</small>
    </Container>
  )
}

export default Issue
let Container = styled.div`
width:100%;
height:45px;
padding:10px 5px;
display:flex;
justify-content:space-between;
align-items:center;
cursor:pointer;
border-bottom:1px solid #333;
border-top:1px solid #333;
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
 :hover{
    background-color:#f4f4f4;
 }
`