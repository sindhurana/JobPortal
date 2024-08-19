import {configureStore} from "@reduxjs/toolkit";
import jobSlice from "./slices/jobSlice";
import userSlice from "./slices/userSlice";
import applicationSlice from "./slices/applicationSlice";
import updateProfileSlice from "./slices/updateProfile";


const store=configureStore({
    reducer:{
      jobs:jobSlice.reducer,
      user:userSlice.reducer,
      applications:applicationSlice.reducer,
      updateProfile:updateProfileSlice.reducer
    }
})

export default store;