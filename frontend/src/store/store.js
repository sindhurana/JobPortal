import {configureStore} from "@reduxjs/toolkit";
import jobSlice from "./slices/jobSlice";


const store=configureStore({
    reducer:{
      jobs:jobSlice.reducer,
    }
})

export default store;