import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { userToggleAddMenu } from '../store/user';

const AddMenuSign = () => {
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(userToggleAddMenu());
  };

  return (
    <View>
      <TouchableOpacity style={styles.total} onPress={onPress}>
        <View style={styles.view_1}></View>
        <View style={styles.view_2}></View>
      </TouchableOpacity>
    </View>
  )
}

export default AddMenuSign

const styles = StyleSheet.create({
  view_1: {
    position: "absolute",
    width: 4,
    height: 35,
    backgroundColor: "#47b75f",
    marginLeft: 15
  },

  view_2: {
    marginTop: 15,
    position: "absolute",
    width: 35,
    height: 4,
    backgroundColor: "#47b75f",
  },

  total: {
    position: "absolute",
    height: 35,
    width: 35,
    marginTop: -40,
    marginLeft: 330,
  }
});
