import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Abhilash Abin",
  email: "abhilashabinz@gmail.com",
  userImg: 'profile.jpeg',
  departments: [],
};

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    reducers: {
      setUserDetails: (state, action) => {
        const { userName, email, userImg } =  action.payload;
        state.userName = "Abhilash Abin"
        state.email = "abhilashabinz@gmail.com";
        state.userImg = 'profile.jpeg';
          },
      clearUserDetails: (state) => {
        Object.assign(state, initialState);
      },
    },
  });
  
  export const { setUserDetails, clearUserDetails } = userDetailsSlice.actions;
  export default userDetailsSlice.reducer;

