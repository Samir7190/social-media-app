import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const SignUp = () => {
    fetch('http://192.168.1.67:3000/auth/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, name: fullName  }),
    
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err)) 
  }
  return (
    <View style={styles.container}>
    <View style={styles.container2}>
      <TextInput style={styles.textinput} placeholder='Full name' value={fullName} onChangeText={(val) => setFullName(val)}/>
      <TextInput style={styles.textinput} placeholder='E-mail' value={email} onChangeText={(val) => setEmail(val)}/>
      <TextInput style={styles.textinput} placeholder='Password' value={password} onChangeText={(val) => setPassword(val)}/>
    <Pressable style={styles.pressable} onPress={SignUp}><Text style={styles.pressabletext}>Create Account</Text></Pressable>
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
    fontSize: 20
  }
})
export default SignUp