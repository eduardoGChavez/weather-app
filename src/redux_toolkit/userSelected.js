import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSelected = createSlice({
  name: "userSelected",
  initialState,
  reducers: {
    redux_setUserSelected: ( state = initialState, action ) => {
      return (state = action.payload);
    },
  },
  
  
  
});

export const {
  redux_setUserSelected
} = userSelected.actions;

export default userSelected.reducer;
