import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLogged: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      if (action.payload && action.payload.user) {
        state.user = action.payload.user;
        state.isLogged = true;
      } else {
        console.error("Datos de usuario no proporcionados en loginSuccess.");
      }
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isLogged = false;
    },
    isLoggedIn: (state) => {
      state.isLogged = true;
    },
    isLoggedOut: (state) => {
      state.isLogged = false;
    }
  },  
});

export const { loginSuccess, logoutSuccess, isLoggedIn, isLoggedOut} = authSlice.actions;

export default authSlice.reducer;