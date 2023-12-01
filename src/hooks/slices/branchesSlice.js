import { createAction, createReducer } from "@reduxjs/toolkit";

export const setBranches = createAction("SET_BRANCHES");

const initialState = {
  branchesData: null,
};

const branchesReducer = createReducer(initialState, {
  [setBranches]: (state, action) => {
    state.branchesData = action.payload;
  },
});

export default branchesReducer;
