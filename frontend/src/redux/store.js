import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";
import onlineUserSlice from "./reducer/online_user";
import modalSlice from "./reducer/modal"
import otherSlice from "./reducer/notification"
import realTimeMessagesSlice from "./reducer/RealTimeMessages"
import realTimeMessagesSlice_test from "./reducer/realTimeMessagesSlice"
import allAPI from "./api";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [onlineUserSlice.name]: onlineUserSlice.reducer,
    [modalSlice.name]: modalSlice.reducer,
    [otherSlice.name]: otherSlice.reducer,
    [realTimeMessagesSlice.name]: realTimeMessagesSlice.reducer,
    [realTimeMessagesSlice_test.name]: realTimeMessagesSlice_test.reducer,
    [allAPI.reducerPath]: allAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allAPI.middleware),
    
});

export default store;
