import { createSlice } from "@reduxjs/toolkit";

const otherSlice = createSlice({
  name: "OTHER",
  initialState: {
    notificationsCount: 0,
  },
  reducers: {
    handleNotificationsCount: (state,{payload}) => {
      state.notificationsCount +=payload;
    },
    resetNotificationsCount: (state) => {
      state.notificationsCount=0;
    },
   
  },
});
export const {handleNotificationsCount,resetNotificationsCount} =otherSlice.actions
export default otherSlice;