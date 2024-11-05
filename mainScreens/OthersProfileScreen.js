import { View, Text, StyleSheet, useWindowDimensions, StatusBar, Image, Pressable, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Posts from './Posts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyContext } from '../MyContext'

const OthersProfileScreen = ({navigation}) => {
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {userId, setUserId} = useContext(MyContext)
  const windowWidth = useWindowDimensions().width
  useEffect(() => {
    const check = async () => {
    try {
    fetch(`http://192.168.1.67:3000/${userId}`) 
    .then(response => response.json())
    .then(response => setUserPosts(response.post))
    .catch(err => console.log(err))  
    console.log(userPosts)

    fetch(`http://192.168.1.67:3000/user/${userId}`) 
    .then(response => response.json())
    .then(response => setUser(response))
    .catch(err => console.log(err))  
    console.log(user)

    } catch (error) {
      console.log(error)
    }
    }
    check() 
    
    
  }, [userId])
  useEffect(() => {
    if(user != null){
      setTimeout(() =>{
        setIsLoading(false)
      }, 400)
      
    }
  })
  if (isLoading == true) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
  return (
    <SafeAreaView>
    <StatusBar  backgroundColor='black'/>
    <FlatList data={userPosts} renderItem={({item}) =>(
    <Posts profilePicture={user.profilePicture } name={user.name} textpost={item.text} likeNumber={item.likes} postId={item._id} navigation={navigation} imageUrl={item.imageUrl}/>
    )}
    keyExtractor={item => item._id} 
    ListHeaderComponent={() => (
      <View>
      <View style={styles.mainProfile}>
      <View>
      <Image style={styles.image} source={{uri: user.profilePicture}}/>
      </View>
      <View style={styles.container}>
      <Text style={styles.text}>{user.name}</Text>
      <View style={styles.profileOptions}>
        <Pressable style={styles.pressable} onPress={() => {
          navigation.navigate('AddPost')
        }}><Text style={styles.text2}>+ Add Post</Text></Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('EditProfile')}><Text style={styles.text2}>Edit Profile</Text></Pressable>
    </View>
      </View>
    </View>
    
    <View style={styles.number}>
      <View style={styles.displayNumbers}>
      <Text style={styles.text}>Posts</Text>
      <Text style={styles.text3}>{user.post.length}</Text>
      </View>
      <View style={styles.displayNumbers}>
      <Text style={styles.text}>Followers</Text>
      <Text style={styles.text3}>{user.following.length}</Text>
      </View>
      <View style={styles.displayNumbers}>
      <Text style={styles.text}>Following</Text>
      <Text style={styles.text3}>{user.followers.length}</Text>
      </View>
      </View>
    </View>
    )}
    />
    </SafeAreaView>
  )
}
}
const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    gap: 6
  },
  mainProfile: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 15
  },
  number: {
    flexDirection: 'row',
    gap: 80,
    justifyContent: 'center',
    borderBottomWidth: 7,
    borderColor: 'grey',
    borderTopWidth: 7,
  
  },
  displayNumbers: {
    alignItems: 'center'
  },
  image: {
    borderWidth: 1,
   
    borderRadius: 100,
    height: 80,
    width: 80,
  
  },
  profileOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 25
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  pressable: {
    backgroundColor: 'blue',
    borderRadius: 10,
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text2: {
    fontSize: 22,
    color: 'white'
  },
 
  friends: {
    borderWidth: 1,
    padding: 10,
  },
  text3: {
    fontSize: 24
  },
  
})
export default OthersProfileScreen