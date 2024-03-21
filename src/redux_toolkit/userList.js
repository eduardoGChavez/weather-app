import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedInitalState: false,
  list: [],
};

export const userList = createSlice({
  name: "userList",
  initialState,
  reducers: {
    redux_setDefaultValues: (state = initialState, action) => {
      state.list = action.payload;
      state.savedInitalState = true;
    },
    redux_updateUserList: (state = initialState, action) => {
      state.list =
        state.list.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
    },
    redux_setUserList: (state = initialState, action) => {
      state.list = [...state.list, action.payload];
    },
    redux_removeUserList: (state = initialState, action) => {
      const newState =
        Array.isArray(state.list) && state.list.length > 0
          ? state.list.filter((item) => item.id !== action.payload)
          : [];
      state.list = newState;
    },
  },
});

export const {
  redux_setDefaultValues,
  redux_setUserList,
  redux_removeUserList,
  redux_updateUserList,
} = userList.actions;
export const selectUserList = (state) => state.users.list;
export const selectUserSavedInitalState = (state) =>
  state.users.savedInitalState;
export default userList.reducer;
