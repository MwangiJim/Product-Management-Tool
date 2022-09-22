import { configureStore } from "@reduxjs/toolkit";
import { IssuesReducer } from "./reducerSlice";

const store = configureStore({
    reducer:{
       issueReducer:IssuesReducer.reducer
    }
})

export default store;