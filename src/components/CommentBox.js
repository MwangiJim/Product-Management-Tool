import React from 'react'
import styled from 'styled-components'

const CommentBox = ({Date,Time,Comment}) => {
  return (
    <Container>
      <div className='left'>
        <div className='line'>
                <h4>Jimmy Mwangi.</h4>
                <small>{Date}.</small>
                <small>{Time}</small>
        </div>
       <p>{Comment}</p>
      </div>
      <img src='./trash.png'/>
    </Container>
  )
}

export default CommentBox

let Container = styled.div`
 width:95%;
 padding:10px 14px;
 background:#fff;
 box-shadow:4px 4px 9px #333;
 border-radius:6px;
 margin:3% 0;
 display:flex;
 justify-content:space-between;
 .line{
    display:flex;
    margin-bottom:8px;
    align-items:center;
 }
 img{
    width:30px;
    height:30px;
    cursor:pointer;
 }
`