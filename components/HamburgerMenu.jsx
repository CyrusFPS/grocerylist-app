import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { userToggleHamburgerMenu } from '../store/user';

const HamburgerMenu = () => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(userToggleHamburgerMenu());
  };

  return (
    <View>
      <TouchableOpacity style={styles.total} onPress={onPress}>
        <View style={styles.hamburger}></View>
        <View style={styles.hamburger}></View>
        <View style={styles.hamburger}></View>
      </TouchableOpacity>
    </View>
  )
}

export default HamburgerMenu

const styles = StyleSheet.create({
  hamburger: {
    width: 35,
    height: 5,
    backgroundColor: "#47b75f",
    marginBottom: 4,
    borderRadius: 7,
  },

  total: {
    width: 35,
    height: 35,
    marginLeft: 10,
    marginTop: 15
  }
});
