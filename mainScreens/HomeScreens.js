import { View, Text, ScrollView, StyleSheet, FlatList, StatusBar, Pressable, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Post from './Post'
import Posts from './Posts'
import { TouchableOpacity } from 'react-native'
const HomeScreens = ({navigation}) => {
  const [userData, setUserData] = useState([])
  const [auser, setAUser] = useState([])
  useEffect(() =>{
    fetch('http://192.168.1.67:3000/post')
    .then(response => response.json())
    .then(response => setUserData(response))
    
    .catch(err => console.log(err)) 
  })
  useEffect(() => {
    fetch('http://192.168.1.67:3000/user/671ce8cf7833974f431db2b0')
    .then(response => response.json())
    .then(response => setAUser(response.following))
  })
  
  return (
    <SafeAreaView>
      <StatusBar backgroundColor='black'/>
      <View style={styles.container}>
                <View style={styles.mainHeader}>
                    <Text style={styles.text} >Social Media App</Text>
                </View>
                <Post navigation={navigation}/>
             </View>
          <FlatList data={userData} renderItem={({item}) =>( 
            <>
            {
              auser.map((item) => {
                console.log(item)
              })
            }
           <Posts profilePicture={item.profilePicture} name={item.author.name} textpost={item.text} imageUrl={item.imageUrl} likeNumber={item.likes} postId={item._id} navigation={navigation}/>
           </>
          )}
          keyExtractor={item => item._id}
          
          />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
   
  },
  mainHeader: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomColor: '#909091',
    borderBottomWidth: 4
  },
  text: {
    fontSize: 24,
    color: 'blue'
  }
})
export default HomeScreens