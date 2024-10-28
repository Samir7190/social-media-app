import { View, Text, StyleSheet, useWindowDimensions, StatusBar, Image, Pressable, ScrollView, FlatList } from 'react-native'
import React, { startTransition, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Post from './Post'
import Posts from './Posts'

const ProfileScreen = ({navigation}) => {
  const [userPosts, setUserPosts] = useState([])
  const windowWidth = useWindowDimensions().width
  useEffect(() =>{
    fetch('http://192.168.1.70:3000/66ffd19c6f8e16c24ec295aa')
    .then(response => response.json())
    .then(response => setUserPosts(response.post))
    .catch(err => console.log(err)) 
  })

  return (
    <SafeAreaView>
    <StatusBar  backgroundColor='black'/>
    <FlatList data={userPosts} renderItem={({item}) =>(
    <Posts profilePicture={'mushshi.webp'} name={'Samir Pokharel'} textpost={item.text} likeNumber={item.likes} postId={item._id} navigation={navigation}/>
    )}
    keyExtractor={item => item._id} 
    ListHeaderComponent={() => (
      <>
      <View style={styles.container}>
      <Image style={{borderWidth: 1, width: windowWidth, height: windowWidth / 1.5}} source={require('../backgroundimage.jpg')}/>
        
      
      <Image style={styles.image} source={require('../mushashi.webp')}/>
      <Text style={styles.text}>Samir Pokharel</Text>
    </View>
    <View>
        <Pressable style={styles.pressable}><Text style={styles.text2}>Edit Profile</Text></Pressable>
    </View>
    <View style={styles.friends}>
        <Text>Friends</Text>
    </View>
    <View style={styles.posts}>
        <Text>Posts</Text>
        <Post navigation={navigation}/>
        
    </View>
    </>
    )}
    />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 420
   
  },
  image: {
    borderWidth: 1,
   
    borderRadius: 100,
    height: 150,
    width: 150,
    position: 'relative',
    bottom: 75,
    
  },
  text: {
    position: 'relative',
    bottom: 70,
    fontSize: 32
  },
  pressable: {
    backgroundColor: 'blue',
    borderRadius: 10,
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text2: {
    fontSize: 24,
    color: 'white'
  },
 
  friends: {
    borderWidth: 1,
    padding: 10,
    height: 200
  },
  posts: {
    borderWidth: 1,
    padding: 10,
    gap: 10
  },
  textinput: {
    borderWidth: 1,
    borderRadius: 100,
    height: 40,
    padding: 10
  }
})
export default ProfileScreen