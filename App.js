import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Form from "./components/Form";
import Home from "./components/Home";
import Menu from "./components/Menu";
import AddMenu from "./components/AddMenu";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

export const store = configureStore();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [hambugerMenu, setHamburgerMenu] = useState(false);
  const [addMenu, setAddMenu] = useState(true);
  const state = store.getState();

  const unsubscribeMe = store.subscribe(() => {
    const newState = store.getState();
    if (newState.auth.user.status.loggedIn) setLoggedIn(true);
    if (!newState.auth.user.status.loggedIn) setLoggedIn(false);
    newState.auth.user.applicationStatus.hamburgerMenuOpen
      ? setHamburgerMenu(true)
      : setHamburgerMenu(false);
    newState.auth.user.applicationStatus.addMenuOpen
      ? setAddMenu(true)
      : setAddMenu(false);
  });

  if (addMenu) {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AddMenu />
        </View>
      </Provider>
    );
  }

  if (hambugerMenu) {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Menu />
        </View>
      </Provider>
    );
  }

  if (loggedIn) {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Home />
        </View>
      </Provider>
    );
  } else {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Form />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 20,
  },
});
