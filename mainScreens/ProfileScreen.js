import { View, Text, StyleSheet, useWindowDimensions, StatusBar, Image, Pressable, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Posts from './Posts'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({navigation}) => {
  const [userId, setUserId] = useState('')
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isloggedIn, setIsLoggedIn] = useState(false)
  const windowWidth = useWindowDimensions().width
  useEffect(() => {
    const check = async () => {
    try {
    const userId = await AsyncStorage.getItem('userId')
    setUserId(userId)
    
    await fetch(`http://192.168.1.67:3000/${userId}`) 
    .then(response => response.json())
    .then(response => setUserPosts(response.post))
    
    .catch(err => console.log(err))  
    console.log(userPosts)
    await fetch(`http://192.168.1.67:3000/user/${userId}`) 
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
      setIsLoading(false)
    }
  })
  const signOut = async () => {
    try{
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('userId')
      setIsLoggedIn(true)  
    } catch(error) {
      console.log(error)
    }
  }
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
        <Pressable style={styles.pressable} onPress={() => signOut()}><Text style={styles.text2}>Sign Out</Text></Pressable>
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
    gap: 20,
    flexWrap: 'wrap',
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  pressable: {
    backgroundColor: 'blue',
    borderRadius: 10,
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
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
export default ProfileScreen