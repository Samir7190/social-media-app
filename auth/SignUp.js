import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState, useTransition } from 'react'

const SignUp = ({navigation}) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateForm = () => {
    let errors = {}
    if(fullName.length < 8) {
      errors.errorfullName = 'Full Must be 8 Characters long'
    }
    if(validateEmail(email) == false) {
      errors.errorEmail = 'Must be a valid Email'
    }
    if(password.length < 8) {
      errors.errorPassword = "Passwords must be 8 characters long"
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const SignUp = () => {
    if(validateForm()) {
      
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
      alert('Account Successfull created')
      setFullName('')
      setEmail('')
      setPassword('')
      setErrors({})
      navigation.navigate('SignIn')
    }

    
  }
  return (
    <View style={styles.container}>
    <View style={styles.container2}>
      <TextInput style={styles.textinput} placeholder='Full name' value={fullName} onChangeText={(val) => setFullName(val)}/>
      {errors.errorfullName ? <Text style={styles.errorText}>{errors.errorfullName}</Text> : null}
      <TextInput style={styles.textinput} placeholder='E-mail' value={email} onChangeText={(val) => setEmail(val)}/>
      {errors.errorEmail ? <Text style={styles.errorText}>{errors.errorEmail}</Text> : null}
      <TextInput style={styles.textinput} placeholder='Password' value={password} onChangeText={(val) => setPassword(val)}/>
      {errors.errorPassword ? <Text style={styles.errorText}>{errors.errorPassword}</Text> : null}
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
  },
  errorText: {
    color: 'red'
  }
})
export default SignUp