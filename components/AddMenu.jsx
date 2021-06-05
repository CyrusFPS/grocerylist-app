import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native'; 
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { addGrocery } from '../store/groceries';
import { useDispatch } from 'react-redux';
import { store } from '../App';

const AddMenu = () => {
  const [groceryItem, setGroceryItem] = useState("");
  const [inCart, setInCart] = useState(false);
  const dispatch = useDispatch();
  const state = store.getState();

  const onSubmit = () => {
    const ids = state.entities.groceries.list.map(item => item.id * 1);
    const id = Math.max(...ids);

    console.log(ids, id);
    const grocery = { name: groceryItem, id, inCart, author: state.auth.user.username };

    dispatch(addGrocery(grocery, state.auth.user.userId));

    setGroceryItem("");
  }
  
  return (
    <GestureRecognizer style={styles.background} onSwipeUp={onSubmit}>
      <Text style={styles.title}>Add List Item</Text>
      <TextInput style={styles.text_input} placeholderTextColor="grey" placeholder="Grocery Item" onChangeText={text => setGroceryItem(text)} value={groceryItem}/>
      <TouchableOpacity>
        <Text style={styles.already_in_cart_text}>Already in cart?</Text><View style={styles.outer_circle}><View style={styles.inner_circle}></View></View>
      </TouchableOpacity>
      <Text style={styles.swipe_up}>Swipe up to submit</Text>
    </GestureRecognizer>
  )
}

export default AddMenu

const styles = StyleSheet.create({
  text_input: {
    width: 308,
    height: 60,
    backgroundColor: "white",
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 15,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 100
  },

  background: {
    width: '100%',
    height: '100%',
    backgroundColor: "#47b75f"
  },

  title: {
    fontSize: 36,
    color: "white",
    display: "flex",
    textAlign: "center",
    marginBottom: 54,
    marginTop: 70,
  },

  already_in_cart_text: {
    fontSize: 28,
    color: "white",
    textAlign: "center",
    marginTop: 40,
  },

  swipe_up: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginTop: 180
  }
});
