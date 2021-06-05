import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "user",
  initialState: {
    username: null,
    userId: null,
    status: {
      loggedIn: false,
      incorrectCreds: false,
    },
    applicationStatus: {
      page: "/",
      loadingAuth: false,
      hamburgerMenuOpen: false,
      addMenuOpen: true,
    },
  },
  reducers: {
    userLoggedIn: (user, action) => {
      console.log("Logged in");
      user.username = action.payload.username;
      user.userId = action.payload.id;
      user.applicationStatus.loadingAuth = false;
      user.status.loggedIn = true;
      user.applicationStatus.page = "/home";
      user.status.incorrectCreds = false;
    },
    userLoggedOut: (user, action) => {
      user.username = null;
      user.userId = null;
      user.status.loggedIn = false;
      user.applicationStatus.page = "/";
    },
    userLogRequested: (user, action) => {
      console.log("REQUEST MADE");
      user.applicationStatus.loadingAuth = true;
    },
    userLogRequestFailed: (user, action) => {
      console.log("REQUEST FAILED");
      user.applicationStatus.loadingAuth = false;
      user.status.incorrectCreds = true;
    },
    userToggledHamburgerMenu: (user, action) => {
      user.applicationStatus.hamburgerMenuOpen =
        !user.applicationStatus.hamburgerMenuOpen;
    },
    userToggledAddMenu: (user, action) => {
      user.applicationStatus.addMenuOpen = !user.applicationStatus.addMenuOpen;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  userLogRequested,
  userLogRequestFailed,
  userToggledHamburgerMenu,
  userToggledAddMenu,
  userAddRequested,
  userAddSuccess,
  userAddFailed,
} = slice.actions;

export default slice.reducer;

const url = "/auth";

export const userLogIn = (user) =>
  apiCallBegan({
    url,
    method: "post",
    data: user,
    onSuccess: userLoggedIn.type,
    onStart: userLogRequested.type,
    onError: userLogRequestFailed.type,
  });

export const userLogOut = () => userLoggedOut();

export const userToggleHamburgerMenu = () => userToggledHamburgerMenu();

export const userToggleAddMenu = () => userToggleAddMenu();
