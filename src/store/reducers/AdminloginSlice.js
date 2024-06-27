import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  userImg: '',
  token: ''
};

const AdminDetailsSlice = createSlice({
    name: "AdminDetails",
    initialState,
    reducers: {
      setAdminDetails: (state, action) => {
        const { userName, token, email, userImg } =  action.payload;
        state.userName = "Admin"
        state.email = email
        state.token = token
        state.userImg = '/profile.jpeg';
          },
      clearAdminDetails: (state) => {
        Object.assign(state, initialState);
      },
    },
  });
  
  export const { setAdminDetails, clearAdminDetails } = AdminDetailsSlice.actions;
  export default AdminDetailsSlice.reducer;

