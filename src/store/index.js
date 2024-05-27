import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from './reducers/loginSlice'
import { persistStore } from "redux-persist";
import tokenSlice from "./reducers/tokenSlice";



//Root Reducer function for Persisting 
const rootReducer = combineReducers({
 
      userDetails: loginSlice,
      token: tokenSlice,
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