import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const logIn = () => {
    fetch('http://192.168.1.67:3000/auth/logIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, }),
    
    })
    .then(async (response) => {
      if(response.status == 200) {
        const data = await response.json()
        console.log(data.token)
        console.log(data.userId)
        try {
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('userId', data.userId)
        } catch (e) {
          console.log(e)
        }
      } else if(response.status == 401) {
        const error = await response.json()
        console.log(error)
      } else {
        const error = await response.json()
        console.log("Server Erro " + error)
      }
    })
    .catch((error) => {
      console.log("Network Error " + error)
    })
    
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TextInput style={styles.textinput} placeholder='E-mail' value={email} onChangeText={(val) => setEmail(val)}/>
        <TextInput style={styles.textinput} placeholder='Password' value={password} onChangeText={(val) => setPassword(val)}/>
        
        <Pressable style={styles.pressable} onPress={logIn}><Text style={styles.pressabletext}>Log In</Text></Pressable>
        <Text>or</Text>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('SignUp')}><Text style={styles.pressabletext}>Create New Account</Text></Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container2: {
    gap: 5,
    alignItems: 'center'
  },
  textinput: {
    height: 60,
    width: 360,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 20
  },
  pressable: {
    height: 50,
    width: 360,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  pressabletext: {
    color: 'white', 
    fontSize: 20,
  }
})
export default SignIn