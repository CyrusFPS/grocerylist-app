import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import HamburgerMenu from './HamburgerMenu';
import AddMenuSign from './AddMenuSign';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { loadGroceries, getGroceries } from '../store/groceries';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const [inCart, setInCart] = useState(false);
  const [currentList, setCurrentList] = useState(false);
  const dispatch = useDispatch();
  const groceries = useSelector(getGroceries);

  useEffect(() => {
    dispatch(loadGroceries(0));
  }, [])

  const onCartTogglePress = () => {
    setCurrentList(!currentList);
    setInCart(!inCart);
  }

  if (currentList) {
    const shownGroceries = groceries.filter(grocery => grocery.inCart === true);

    return (
      <View>
        <HamburgerMenu></HamburgerMenu><AddMenuSign></AddMenuSign>
        <Text style={styles.title}>Your Family List</Text>
        <FlatList 
        data={shownGroceries}
        renderItem={({item}) => <ListItem name={item.name} author={item.author} id={item.id}/>}
        />
        <TouchableOpacity style={styles.cart_btn} onPress={onCartTogglePress}>
          <Text style={styles.cart_btn_text}>{inCart ? "In cart" : "Not in cart"}</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    const shownGroceries = groceries.filter(grocery => grocery.inCart === false);

    return (
      <View>
        <HamburgerMenu></HamburgerMenu><AddMenuSign></AddMenuSign>
        <Text style={styles.title}>Your Family List</Text>
        <FlatList 
        data={shownGroceries}
        renderItem={({item}) => <ListItem name={item.name} author={item.author} id={item.id.toString()}/>}
        />
        <TouchableOpacity style={styles.cart_btn} onPress={onCartTogglePress}>
          <Text style={styles.cart_btn_text}>{inCart ? "In cart" : "Not in cart"}</Text>
        </TouchableOpacity>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    color: "#47b75f",
    fontWeight: "100",
    display: "flex",
    textAlign: "center",
    marginBottom: 54,
    marginTop: 54,
  },

  cart_btn: {
    display: "flex",
    width: 173,
    height: 44,
    borderRadius: 20,
    backgroundColor: "#47b75f",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  
  cart_btn_text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  }
});

export default Home
