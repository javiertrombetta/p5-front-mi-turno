import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showNav: true
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowNavigation: (state, action) => {
      state.showNav = action.payload;
    }
  }
});

export const { setShowNavigation } = uiSlice.actions;
export default uiSlice.reducer;