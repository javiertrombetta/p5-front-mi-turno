import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from "redux-persist";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
    inSuccess: (state) => {
      state.isLoggedIn = true;
    },
    outSuccess: (state) => {
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return {
        user: null,
        isLoggedIn: false,
        isCookieAlive: false,
      };
    });
  }
});

export const { loginSuccess, logoutSuccess, inSuccess, outSuccess} = authSlice.actions;

export default authSlice.reducer;

