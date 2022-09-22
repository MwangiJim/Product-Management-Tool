import { createSlice } from "@reduxjs/toolkit";

export const IssuesReducer = createSlice({
    name:"Issues",
    initialState:{
        Issue:{
            
        }
    },
    reducers:{
        setIssue(state,action){
            return{
                ...state,
                Issue:action.payload
            }
        }
    }
})

export const{setIssue} = IssuesReducer.actions

export default IssuesReducer.reducer