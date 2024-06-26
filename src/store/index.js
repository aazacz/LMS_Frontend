import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from './reducers/TutorloginSlice'
import { persistStore } from "redux-persist";
import tokenSlice from "./reducers/tokenSlice";
import StudentDetailsSlice from "./reducers/StudentloginSlice"
import AdminDetailsSlice from './reducers/AdminloginSlice'
import TutorDetailsSlice from './reducers/TutorloginSlice'

//Root Reducer function for Persisting 
const rootReducer = combineReducers({
 
      StudentDetails: StudentDetailsSlice,
      AdminDetails:AdminDetailsSlice,
      TutorDetails:TutorDetailsSlice
  
  });


const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
  });

  export const persistor = persistStore(store);