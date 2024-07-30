import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  userImg: '',
  token: '',
 
};

const StudentDetailsSlice = createSlice({
    name: "StudentDetails",
    initialState,
    reducers: {
      setStudentDetails: (state, action) => {
        const { name, token, email, userImg } =  action.payload;
        state.userName = name
        state.email = email
        state.token = token
        state.userImg = '/profile.jpeg';
          },
      clearStudentDetails: (state) => {
        Object.assign(state, initialState);
      },
    },
  });
  
  export const { setStudentDetails, clearStudentDetails } = StudentDetailsSlice.actions;
  export default StudentDetailsSlice.reducer;

 