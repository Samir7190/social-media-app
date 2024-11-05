import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'

const SignUp = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullNameError, setFullNameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const SignUp = () => {
    if(fullName.length < 8) {
      setFullNameError('Full Name must be 8 characters long')
    }
    if(validateEmail(email) == false) {
      setEmailError('Please enter a valid email')
    }
    if(password.length < 8) {
      setPasswordError('password must be 8 characters long')
    }
    if(fullName.length > 8) {
      setFullNameError(null)
    }
    if(validateEmail(email) ) {
      setEmailError(null)
    }
    if(password.length > 8) {
      setPasswordError(null)
    }
    if(fullNameError == null && passwordError == null && emailError == null){
      alert('Account Created Successfully')
    }
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
      {fullNameError != null && <Text>{fullNameError}</Text>}
      <TextInput style={styles.textinput} placeholder='E-mail' value={email} onChangeText={(val) => setEmail(val)}/>
      {emailError != null && <Text>{emailError}</Text>}
      <TextInput style={styles.textinput} placeholder='Password' value={password} onChangeText={(val) => setPassword(val)}/>
      {passwordError != null && <Text>{passwordError}</Text>}
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