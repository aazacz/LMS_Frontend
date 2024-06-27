import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Abhilash Abin",
  email: "abhilashabinz@gmail.com",
  userImg: 'https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=',
  token: '',
 
};

const StudentDetailsSlice = createSlice({
    name: "StudentDetails",
    initialState,
    reducers: {
      setStudentDetails: (state, action) => {
        const { userName, token, email, userImg } =  action.payload;
        state.userName = "Student"
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

