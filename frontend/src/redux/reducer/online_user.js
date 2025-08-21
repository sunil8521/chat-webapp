import { createSlice } from "@reduxjs/toolkit";

const onlineUserSlice = createSlice({
  name: "ONLINEUSER",
  initialState: {
    online_users: [],
  },
  reducers: {
    setOnlineUser: (state, action) => {
      state.online_users = action.payload;
    },
  },
});

export const {setOnlineUser}=onlineUserSlice.actions
export default onlineUserSlice