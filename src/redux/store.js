import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";
import allAPI from "./api";
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [allAPI.reducerPath]: allAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allAPI.middleware),
    
});

export default store;
