import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  email: "",
  userImg: "",
  token: "",
};

const TutorDetailsSlice = createSlice({
  name: "TutorDetails",
  initialState,
  reducers: {
    setTutorDetails: (state, action) => {
      const { name, token, email, profile } = action.payload;
      state.userName = name;
      state.email = email;
      state.token = token;
      state.userImg = profile;
    },
    clearTutorDetails: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setTutorDetails, clearTutorDetails } = TutorDetailsSlice.actions;
export default TutorDetailsSlice.reducer;
