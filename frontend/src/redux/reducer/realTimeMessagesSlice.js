// realTimeMessagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const realTimeMessagesSlice_test = createSlice({
  name: "realTimeMessages",
  initialState: {}, // object keyed by chatId
  reducers: {
    addRealTimeMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state[chatId]) {
        state[chatId] = [];
      }
      state[chatId].push(message);
    },
    clearChatMessages: (state, action) => {
      const chatId = action.payload;
      state[chatId] = [];
    },
  },
});

export const { addRealTimeMessage, clearChatMessages } =
  realTimeMessagesSlice_test.actions;
export default realTimeMessagesSlice_test;
