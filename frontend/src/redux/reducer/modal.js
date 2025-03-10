import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "MODAL",
  initialState: {
    findFriends: false,
    notifications:false,
    seeUserProfile:false,
    userProfileData:{}

  },
  reducers: {
    toggleFindFriendsModal: (state) => {
      state.findFriends = !state.findFriends;
    },
    toggleNotofocationModal: (state) => {
      state.notifications = !state.notifications;
    },
    toggleSeeUserProfileModal: (state) => {
      state.seeUserProfile = !state.seeUserProfile;
    },
    setUserProfileData: (state,{payload}) => {
      
      state.userProfileData = payload
    },


  },
});
export const {toggleFindFriendsModal,toggleNotofocationModal,toggleSeeUserProfileModal,setUserProfileData} =modalSlice.actions
export default modalSlice;