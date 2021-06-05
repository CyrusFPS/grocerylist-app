import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native';
import HamburgerMenu from './HamburgerMenu';
import MenuItem from './MenuItem';

const Menu = () => {
  const menuOptions = [{ name: "Account", description: "Settings, Email, Password", id: 0 }, 
  { name: "Family", description: "Manage Members, Permissions", id: 1 }, 
  { name: "General Settings", description: "App Settings, Preferences", id: 2 }];

  return (
    <View>
      <HamburgerMenu></HamburgerMenu>
      <Text style={styles.title}>Menu</Text>
      <FlatList 
        data={menuOptions}
        renderItem={({item}) => <MenuItem name={item.name} description={item.description} id={item.id.toString()}/>}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    color: "#47b75f",
    fontWeight: "100",
    display: "flex",
    textAlign: "center",
    marginBottom: 54,
    marginTop: 54,
  },
});

export default Menu
