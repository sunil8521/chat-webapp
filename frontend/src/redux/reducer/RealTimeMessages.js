import { createSlice } from "@reduxjs/toolkit";

const realTimeMessagesSlice = createSlice({
  name: "REALTIMEMESSAGES",
  initialState: {
    realTimeMessages: [],
  },
  reducers: {
    setRealTimeMessages: (state, action) => {
      state.realTimeMessages = action.payload;
    },
    addRealTimeMessage: (state, action) => {
      state.realTimeMessages.push(action.payload);
    },
  },
});
export const { setRealTimeMessages, addRealTimeMessage } = realTimeMessagesSlice.actions;
export default realTimeMessagesSlice;