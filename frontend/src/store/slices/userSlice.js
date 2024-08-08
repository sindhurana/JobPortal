import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const userSlice=createSlice({
    name:"User",
    initialState:{
        loading:false,
        isAuthenticated:false,
        user:{},
        error:null,
        message:null
    },
    reducers:{
        registerRequest(state,action){
         state.loading=true;
         state.isAuthenticated=false;
         state.user={}
         state.error=null;
         state.message=null;
        },
        registerSuccess(state,action){
            state.loading=false;
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.error=null;
            state.message=action.payload.message

        },
        registerfailure(state,action){
            state.loading=false;
            state.isAuthenticated=false;
            state.user={}
            state.error=action.payload;
            state.message=null;            
        },
        clearAllErrors(state){
            state.error=null;
            state.user=state.user;
        }
    }
})

export const register=(data)=>async(dispatch)=>{
dispatch(userSlice.actions.registerRequest());

try {
    const response=await axios.post("http://localhost:4000/api/user/register",data,
        {withCredentials:true,
            headers:{"Content-Type":"multipart/form-data"}
        });

        dispatch(userSlice.actions.registerSuccess(response.data));
        dispatch(userSlice.actions.clearAllErrors());

    
} catch (error) {
    dispatch(userSlice.actions.registerfailure());
}

}

export const clearAllUserErrors=(dispatch)=>{
dispatch(userSlice.actions.clearAllErrors());
}

export default userSlice;