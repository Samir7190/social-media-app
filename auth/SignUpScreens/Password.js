import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const Password = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TextInput style={styles.textinput} placeholder='password' />
        <TextInput style={styles.textinput} placeholder='retype password' />
        <Pressable style={styles.pressable}><Text style={styles.pressabletext}>Submit</Text></Pressable>
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
      height: 40,
      width: 200,
      borderWidth: 1,
      borderRadius: 10,
      padding: 10
    },
    pressable: {
      height: 40,
      width: 200,
      borderWidth: 1,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue'
    },
    pressabletext: {
      color: 'white'
    }
  })
export default Password