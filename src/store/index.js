import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from './reducers/loginSlice'


//Root Reducer function for Persisting 
const rootReducer = combineReducers({
    // form: formReducer,
    // token: tokenSlice,
      userDetails: loginSlice,
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