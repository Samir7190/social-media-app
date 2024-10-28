import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native'
import React from 'react'

const Post = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../mushashi.webp')}/>
      <Pressable onPress={() => navigation.navigate('AddPost')}>
        <Text style={styles.textinput}>Add a Post </Text>
      </Pressable>
      <Image style={styles.image} source={require('../assets/imageicon.png')} />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 7,
        borderBottomColor: '#909091',
        paddingBottom: 10,
        paddingTop: 10
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 100
    },
    textinput: {
        borderWidth: 1,
        borderRadius: 100,
        height: 50,
        padding: 10,
        width: 280
      }
})
export default Post