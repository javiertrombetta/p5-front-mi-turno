import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    jwtToken: null 
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.jwtToken = action.payload.jwtToken;
      state.isAuthenticated = true;
    },
    logoutSuccess: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.jwtToken = null;
    },
    setJwtToken: (state, action) => {
      state.jwtToken = action.payload;
    }
  }
});

export const { loginSuccess, logoutSuccess, setJwtToken } = authSlice.actions;

export default authSlice.reducer;