import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const updateProfileSlice=createSlice({
    name:"updateProfile",
    initialState:{
        loading:false,
        error:null,
        isUpdated:false
    },
    reducers:{
        updateProfileRequest(state,action){
            state.loading=true;            
        },
        updateProfileSuccess(state,action){
            state.loading=false;
            state.error=null;
            state.isUpdated=true;
                    },
        updateProfileFailure(state,action){
            state.loading=false;
            state.error=action.payload;
            state.isUpdated=false;
        },
        updatePasswordRequest(state,action){
            state.loading=true; 
        },
        updatePasswordSuccess(state,action){
            state.loading=false;
            state.error=null;
            state.isUpdated=true;
        },
        updatePasswordFailure(state,action){
            state.loading=false;
            state.error=action.payload;
            state.isUpdated=false;
        },
        profileResetAfterUpdate(state,action){
            state.error=null;
            state.isUpdated=false;
            state.loading=false;
        }
    }
})

export const updateProfile=(data)=>async(dispatch)=>{
    dispatch(updateProfileSlice.actions.updateProfileRequest());

    try {
        const response=await axios.put("http://localhost:4000/api/user/update/profile",data,{withCredentials:true,headers:{
            "Content-Type":"multipart/form-data"
        }});

        dispatch(updateProfileSlice.actions.updateProfileSuccess());        
    } catch (error) {
        console.log(error)
        dispatch(updateProfileSlice.actions.updateProfileFailure(error.response.data.message 
            || "failed to update Profile"));
    }
}

export const updatePassword=(data)=>async(dispatch)=>{
    dispatch(updateProfileSlice.actions.updatePasswordRequest());

    try {
        const response=await axios.put("http://localhost:4000/api/user/update/password",data,{withCredentials:true,headers:{
            "Content-Type":"application/json"
        }});

        dispatch(updateProfileSlice.actions.updatePasswordSuccess());        
    } catch (error) {
        console.log(error)
        dispatch(updateProfileSlice.actions.updatePasswordFailure(error.response.data.message 
            || "failed to update Password"));
    }
}

export const clearAllUpdateProfileErrors=()=>(dispatch)=>{
    dispatch(updateProfileSlice.actions.profileResetAfterUpdate())
}

export default updateProfileSlice;