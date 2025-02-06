import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "MODAL",
  initialState: {
    findFriends: false,
    notifications:false
  },
  reducers: {
    toggleFindFriendsModal: (state) => {
      state.findFriends = !state.findFriends;
    },
    toggleNotofocationModal: (sate) => {
      sate.notifications = !sate.notifications;
    },
  },
});
export const {toggleFindFriendsModal,toggleNotofocationModal} =modalSlice.actions
export default modalSlice;