import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";
import onlineUserSlice from "./reducer/online_user";
import allAPI from "./api";
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [onlineUserSlice.name]: onlineUserSlice.reducer,
    [allAPI.reducerPath]: allAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allAPI.middleware),
    
});

export default store;
