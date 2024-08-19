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
        state.loading=false;
        state.jobs=action.payload;
        state.error=null;
     },
     failureForAllJobs(state,action){
        state.loading=false;
        state.error=action.payload;
     },
     requestForSingleJob(state,action){
          state.loading=true;
          state.error=null;
     },
     successForSingleJob(state,action){
   state.loading=false;
   state.error=null;
   state.singleJob=action.payload;
     },
     failureForSingleJob(state,action){
     state.loading=false;
     state.error=action.payload;
     state.singleJob=state.singleJob;
     },
     requestForPostJob(state,action){
      state.loading=true;
      state.message=null;
      state.error=null;
     },
     successForPostJob(state,action){
      state.loading=false;
      state.message=action.payload;
      state.error=null;
     },
     failureForPostJob(state,action){
      state.loading=false;
      state.message=null;
      state.error=action.payload;
     },
     requestForMyJobs(state,action){
       state.loading=true;
       state.myJobs=[];
       state.error=null;
     },
     successForMyJobs(state,action){
      state.loading=false;
       state.myJobs=action.payload;
       state.error=null;
     },
     FailureForMyJobs(state,action){
      state.loading=false;
       state.myJobs=state.myJobs;
       state.error=action.payload;
     },
     requestForDeleteJob(state,action){
      state.loading=true;
      state.error=null;
      state.message=null;
    },
    successForDeleteJob(state,action){
      state.loading=false;
      state.error=null;
      state.message=action.payload;
    },
    failureForDeleteJob(state,action){
      state.loading=false;
      state.error=action.payload;
      state.message=null;
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

   link+=queryParams.join("&");

   const response =await axios.get(link,{withCredentials:true});
   // console.log(response)
   dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
   dispatch(jobSlice.actions.clearAllErrors());

   
 } catch (error) {
   dispatch(jobSlice.actions.failureForAllJobs(error.response.data.message));
 }
}

export const fetchSingleJob=(jobId)=>async(dispatch)=>{
dispatch(jobSlice.actions.requestForAllJobs());

try {
   const response =await axios.get(`http://localhost:4000/api/job/get/${jobId}`,{withCredentials:true});
   // console.log(response)
   dispatch(jobSlice.actions.successForSingleJob(response.data.job));
   dispatch(jobSlice.actions.clearAllErrors());
} catch (error) {
   dispatch(jobSlice.actions.failureForSingleJob(error.response.data.message));
}
}

export const postJob=(data)=>async(dispatch)=>{
   dispatch(jobSlice.actions.requestForPostJob());

try {
   const response =await axios.post(`http://localhost:4000/api/job/postJob`,data,{withCredentials:true,headers:{
      "Content-Type":"application/json"
   }});
   // console.log(response)
   dispatch(jobSlice.actions.successForPostJob(response.data.message));
   dispatch(jobSlice.actions.clearAllErrors());
} catch (error) {
   dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));
}
}

export const getMyJobs=()=>async(dispatch)=>{
   dispatch(jobSlice.actions.requestForMyJobs());

   try {
      const response =await axios.get(`http://localhost:4000/api/job/getMyJobs`,{withCredentials:true});
      // console.log(response)
      dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
      dispatch(jobSlice.actions.clearAllErrors());
   } catch (error) {
      dispatch(jobSlice.actions.FailureForMyJobs(error.response.data.message));
   }
}

export const deleteJob=(id)=>async(dispatch)=>{
   dispatch(jobSlice.actions.requestForDeleteJob());
   try {
       const response =await axios.delete(`http://localhost:4000/api/job/deleteJob/${id}`,
           {withCredentials:true});
   
           dispatch(jobSlice.actions.successForDeleteJob(response.data.message));
           dispatch(clearAllJobsError())
   } catch (error) {
       dispatch(jobSlice.actions.failureForDeleteJob(error.response.data.message));
   }
}

export const clearAllJobsError=()=>(dispatch)=>{
dispatch(jobSlice.actions.clearAllErrors());
}

export const reesetJobSlice=()=>(dispatch)=>{
dispatch(jobSlice.actions.resetJobSlice());
}

export default jobSlice;