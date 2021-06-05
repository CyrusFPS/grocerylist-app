import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const MenuItem = (props) => {
  const onPress = () => {
    console.log("PRESSED");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.author}>{props.description}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 67,
    backgroundColor: "white",
    margin: 3,
    padding: 5,
    borderBottomColor: "#47B75F",
    borderBottomWidth: 2,
  },

  name: {
    fontSize: 24,
    color: "#47B75F",

  },

  author: {
    marginTop: 3,
    fontSize: 14,
    color: "#47B75F",

  },

  inCart: {
    position: "absolute",
    right: 0
  }
});

export default MenuItem
