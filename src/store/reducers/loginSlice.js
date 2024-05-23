import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Abhilash Abin",
  email: "",
  userImg: "",
  departments: [],
};

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
      setUserDetails: (state, action) => {
        const { userName, email, userImg } =  action.payload;
        state.userName = "Abhilash Abin"
        state.email = email;
        state.userImg = userImg;
          },
      clearUserDetails: (state) => {
        Object.assign(state, initialState);
      },
    },
  });
  
  export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;
  export default userDetailsSlice.reducer;

