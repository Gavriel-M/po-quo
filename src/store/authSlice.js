import { createSlice } from "@reduxjs/toolkit";


const initialAuthState = {
  loggedIn: false,
  token: "",

};


const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      console.log("New Payload : ", state.token);
    },
  },
});


export const { login, logout, updateToken } = authSlice.actions;

export default authSlice.reducer;
