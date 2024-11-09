import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { MyContext } from '../MyContext'

const Following = () => {
  const [users, setUsers] = useState()
  const [following, setFollowing] = useState()
  const {follow, unFollow, userId} = useContext(MyContext)
  useEffect(() => {
    try {
    fetch(`http://192.168.1.67:3000/users/${userId}`)
    .then(response => response.json())
    .then(response => setUsers(response))
    
    } catch(error) {
      console.log(error)
    } 
    }, [users])
  useEffect(() => {
    if(users != null) {
      const followingList = users.filter(item => item.isFollowing)
      setFollowing(followingList)
     }
      }, [users])
  return (
    <FlatList 
        data={following}
        renderItem={({item}) => (
      <View style={styles.headers}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: item.profilePicture }} />
        <View style={styles.nameandfollowing}>
        <Text style={styles.text}>{item.name}   </Text>
        <Pressable onPress={() => {
        if(item.isFollowing == true) {
          unFollow(item._id, userId)
        } else{
          follow(item._id, userId)
        }
      }}>
        <Text style={styles.text2}>{item.isFollowing ? 'Following' : 'Follow'}</Text>
      </Pressable>
      </View>
      </View>
      
      </View>
        )}
      
      />
    
  )
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  headers: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flexWrap: 'wrap',
    padding: 5
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  text2: {
    fontSize: 18,
    color: 'blue',
    fontWeight: 'bold'
  },
  nameandfollowing: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
})
export default Following