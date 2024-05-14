import { createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";


export const FirstSlice = createSlice({
  name: "user",
  initialState: {
    data: [{ name: "Prajkta", email: "prajkta@gmail.com", Password: "Abcd@123", status: true, role:"admin" }],
    userExists: false,
  },
  reducers: {
    add: (state, action) => {
      console.log("data added successfully", action.payload)
      action.payload.status = true;
      console.log("action.payload", action.payload)
      state.data.push(action.payload);
    },
    checkLogin: (state, action) => {
      state.loading = true;
      const { email, Password } = action?.payload;
      const userExists = state?.data?.some(
        (user) => user?.email === email && user?.Password === Password 
      );
      state.userExists = userExists;
      state.loading = false;
      if (userExists) {
        toast.success("User is logged in successfully");
      } else {
        toast.error("Invalid email or password");
      }
    },
    logOutUser: (state,action) => {
      state.userExists = false;
    },
  }
})

export const { add, checkLogin,logOutUser } = FirstSlice.actions;
export default FirstSlice.reducer;