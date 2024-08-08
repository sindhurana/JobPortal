import {configureStore} from "@reduxjs/toolkit";
import jobSlice from "./slices/jobSlice";
import userSlice from "./slices/userSlice";


const store=configureStore({
    reducer:{
      jobs:jobSlice.reducer,
      user:userSlice.reducer
    }
})

export default store;