import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  userData: null,
};

const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    state.userData = action.payload;
  },
});
// const userReducer = createReducer(initialState, (builder) => {
// builder.addCase(setUser, (state, action) => {
//   state.userData = action.payload;
// });
// });

export const selectUser = (state) => state.user.userData;

export default userReducer;
