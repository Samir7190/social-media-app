import { View, Text, StyleSheet, useWindowDimensions, StatusBar, Image, Pressable, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Posts from './Posts'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MyContext } from '../MyContext'
import { TouchableOpacity } from 'react-native'

const ProfileScreen = ({navigation}) => {
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const {token, setToken} = useContext(MyContext)
  const {userId} = useContext(MyContext)
  const windowWidth = useWindowDimensions().width
  const fetchUser = async () => {
    try{
      const response2 = await fetch(`http://192.168.1.67:3000/user/${userId}`) 
      const data2 = await response2.json()
      setUser(data2) 
    } catch(error) {
      console.log(error)
    }
  }

  const fetchUserPosts = async () => { 
    try {
    const response = await fetch(`http://192.168.1.67:3000/${userId}`) 
    const data = await response.json()
    setUserPosts(data)
    
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

    }
  useEffect(() =>{
    fetchUser()
  }, [])
  useEffect(() => {
    fetchUserPosts()
  }, [userPosts])
  const signOut = async () => {
    try{
      AsyncStorage.removeItem('token')
      AsyncStorage.removeItem('userId')
      setToken(null)  
    } catch(error) {
      console.log(error)
    }
  }
  const HeaderComponent = () => {
    return (
      <View>
      <View style={styles.mainProfile}>
      <View style={styles.imageContainer}>
      <Image style={styles.image} source={{uri: user.profilePicture}}/>
      </View>
      <View style={styles.container}>
      <Text style={{fontSize: 32, fontWeight: '500'}}>{user.name}</Text>
      <View style={styles.profileOptions}>
        
        <Pressable style={styles.pressable} onPress={() => {
          navigation.navigate('AddPost')
        }}>
          <Text style={styles.text2}>+ Add Post</Text>
       
        </Pressable>
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
    )
  }
  if (isLoading == true) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } 
  return (
    <ScrollView>
    <StatusBar  backgroundColor='black'/>
    {HeaderComponent()}
    {userPosts.map((item) => 
      <View key={item._id}> 
      <Posts profilePicture={user.profilePicture } name={user.name} textpost={item.text} likeNumber={item.likes} postId={item._id} navigation={navigation} imageUrl={item.imageUrl} date={item.date} isLiked={item.isLiked} isFollowed={item.isFollowed} UserId={user._id}/>
       
       </View>
    )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 6
  },
  mainProfile: {
  
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
    height: 150,
    width: 150,
  
  },
  profileOptions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 40,
    flexWrap: 'wrap',
    flex: 1,
  },
  
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  pressable: {
    backgroundColor: '#0388fc',
    borderRadius: 6,
    height: '150%',
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    
  },
  text2: {
    fontSize: 24,
    color: 'white'
  },
 
  friends: {
    borderWidth: 1,
    padding: 10,
  },
  text3: {
    fontSize: 24
  },
  imageContainer: {
    alignItems: 'center'
  }
})
export default ProfileScreen