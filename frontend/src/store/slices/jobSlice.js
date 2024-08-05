import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice=createSlice({
    name:"jobs",
    initialState:{
        jobs:[],
        loading:false,
        error:null,
        message:null,
        singleJob:{},
        myJobs:[]
    },
    reducers:{
     requestForAllJobs(state,action){
        state.loading=true;
        state.error=null;
     },
     successForAllJobs(state,action){
        state.loading=true;
        state.jobs=action.payload;
        state.error=null;
     },
     failureForAllJobs(state,action){
        state.loading=false;
        state.error=action.payload;
     },
     clearAllErrors(state,action){
      state.error=null;
      state.jobs=state.jobs;
     },
     resetJobSlice(state,action){
      state.error=null;
      state.jobs=state.jobs;
      state.loading=false;
      state.myJobs=state.myJobs;
      state.message=null;
      state.singleJob={};
     }
    }
})

export const fetchJobs=(location,jobNiche,searchKeyWord="")=>async(dispatch)=>{
 try {
   dispatch(jobSlice.actions.requestForAllJobs());
   let link="http://localhost:4000/api/job/getAllJobs?"
   let queryParams=[];

   if(searchKeyWord){
      queryParams.push(`searchKeyWord=${searchKeyWord}`);
   }

   if(location){
      queryParams.push(`location=${location}`);
   }

   if(jobNiche){
      queryParams.push(`jobNiche=${jobNiche}`);
   }

   link=queryParams.join("&");

   const response =await axios.get(link,{withCredentials:true});

   dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
   dispatch(jobSlice.actions.clearAllErrors());

   
 } catch (error) {
   dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
 }
}

export const clearAllJobsError=()=>(dispatch)=>{
dispatch(jobSlice.actions.clearAllErrors());
}

export const reesetJobSlice=()=>(dispatch)=>{
dispatch(jobSlice.actions.resetJobSlice());
}

export default jobSlice;