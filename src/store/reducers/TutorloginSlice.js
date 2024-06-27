import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Abhilash Tutor",
  email:    "tutor@gmail.com",
  userImg: 'https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=',
  token: '',

};

const TutorDetailsSlice = createSlice({
    name: "TutorDetails",
    initialState,
    reducers: {
      setTutorDetails: (state, action) => {
        const { userName, token, email, userImg } =  action.payload;
        state.userName = "Tutor"
        state.email = email
        state.token = token
        state.userImg = 'https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=';
          },
        clearTutorDetails: (state) => {
        Object.assign(state, initialState);
      },
    },
  });
  
  export const { setTutorDetails, clearTutorDetails } = TutorDetailsSlice.actions;
  export default TutorDetailsSlice.reducer;

