import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateGroceryStatus } from '../store/groceries';

const ListItem = (props) => {
  const dispatch = useDispatch(); 

  const onPress = (id) => {
    id = parseInt(id);
    dispatch(updateGroceryStatus(0, id));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(props.id.toString())}>
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.author}>Added by {props.author}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 67,
    backgroundColor: "#47B75F",
    margin: 3,
    padding: 5,
  },

  name: {
    fontSize: 24,
    color: "white",

  },

  author: {
    marginTop: 3,
    fontSize: 14,
    color: "white",

  },

  inCart: {
    position: "absolute",
    right: 0
  }
});

export default ListItem
