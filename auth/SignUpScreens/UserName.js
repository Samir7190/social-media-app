import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const UserName = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TextInput style={styles.textinput} placeholder='first name' />
        <TextInput style={styles.textinput} placeholder='last name' />
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('Email')}><Text style={styles.pressabletext}>Submit</Text></Pressable>
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
export default UserName