import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import uiReducer from "./slices/uiSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    ui: uiReducer,
    user: userReducer,
  },
});
