import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { userLogIn } from '../store/user'

const Form = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogIn({ username, password }));

    console.log({ username, password });

    setUsername('');
    setPassword('');
  };

  return (
    <View>
      <Text style={styles.title}>Grocery List</Text>
      <View style={styles.container}>
        <Text style={styles.sign_in}>Sign In</Text>
        <TextInput placeholder="Email" style={styles.input} placeholderTextColor="white" onChangeText={text => setUsername(text)} value={username}/>
        <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} placeholderTextColor="white" onChangeText={text => setPassword(text)} value={password}/>
        <TouchableOpacity>
          <Text style={styles.forgot_text}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.login_btn} onPress={onSubmit}>
        <Text style={styles.login_text}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signup_text}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    color: "#47b75f",
    fontWeight: "100",
    display: "flex",
    textAlign: "center",
    marginBottom: 60,
  },

  container: {
    textAlign: "center",
    margin: "auto",
    width: 317,
    height: 238,
    borderRadius: 11,
    backgroundColor: "white",
  },

  sign_in: {
    textAlign: "center",
    color: "#47b75f",
    paddingTop: 10,
    fontWeight: "100",
    fontSize: 36,
    marginBottom: 15,
  },

  input: {
    width: 265,
    height: 43,
    borderRadius: 5,
    fontWeight: "100",
    fontSize: 16,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#47b75f",
    color: "white",
  },

  forgot_text: {
    textAlign: "center",
    textDecorationLine: "none",
    color: "#47b75f",
    fontWeight: "bold",
    fontSize: 24,
  },

  login_btn: {
    display: "flex",
    width: 316,
    height: 64,
    borderRadius: 18,
    backgroundColor: "#47b75f",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  login_text: {
    color: "white",
    fontSize: 30,
  },

  signup_text: {
    marginTop: 80,
    fontSize: 24,
    textDecorationLine: "none",
    color: "#47b75f",
    fontWeight: "bold",
    display: "flex",
    textAlign: "center",
  }
});

export default Form;
