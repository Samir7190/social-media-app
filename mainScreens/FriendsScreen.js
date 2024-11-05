import { View, Text, StyleSheet, Image, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'


const FriendsScreen = () => {
  const [users, setUsers] = useState(null)
  const [following, setFollowing] = useState()
  const [followers, setFollowers] = useState()
  const follow = (userId) => {
    fetch('http://192.168.1.67:3000/follow', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userId, followerId: '671ce9ab7833974f431db2bb'})
    })
    .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
  const unFollow = (userId) => {
    fetch('http://192.168.1.67:3000/unfollow', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userId, followerId: '671ce9ab7833974f431db2bb'})
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
  useEffect(() => {
  try {
  fetch('http://192.168.1.67:3000/users/671ce9ab7833974f431db2bb')
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
    useEffect(() => {
      if(users != null) {
        const followersList = users.filter(item => item.isFollowed)
        setFollowers(followersList)
      }
      }, [users])

  return (

    <View style={styles.container}>
      <View style={styles.containers}>
      <Text style={styles.text}>Following</Text>
      <FlatList 
        data={following}
        renderItem={({item}) => 
            (
               <View style={styles.headers}>
                <View style={styles.header}>
                <Image style={styles.image} source={{ uri: item.profilePicture }} />
                <View style={styles.nameandfollowing}>
                <Text style={styles.text}>{item.name}   </Text>
                <Pressable onPress={() => {
                if(item.isFollowed == true) {
                  unFollow(item._id)
                } else{
                  follow(item._id)
                }
              }}>
                <Text style={styles.text2}>{item.isFollowed ? 'Following' : 'Follow'}</Text>
              </Pressable>
              </View>
              </View>
              
              </View>
              )
          }
      />
      </View>
      <View style={styles.containers}>
      <Text style={styles.text}>Followers</Text>
      <FlatList 
        data={followers}
        renderItem={({item}) => (
      <View style={styles.headers}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: item.profilePicture }} />
        <View style={styles.nameandfollowing}>
        <Text style={styles.text}>{item.name}   </Text>
        <Pressable onPress={() => {
        if(item.isFollowed == true) {
          unFollow(item._id)
        } else{
          follow(item._id)
        }
      }}>
        <Text style={styles.text2}>{item.isFollowed ? 'Following' : 'Follow'}</Text>
      </Pressable>
      </View>
      </View>
      
      </View>
        )}
      />
   </View>
      <View style={styles.containers}>
      <Text style={styles.text}>Users</Text>
      <FlatList 
        data={users}
        renderItem={({item}) => (
      <View style={styles.headers}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: item.profilePicture }} />
        <View style={styles.nameandfollowing}>
        <Text style={styles.text}>{item.name}   </Text>
        <Pressable onPress={() => {
        if(item.isFollowed == true) {
          unFollow(item._id)
        } else{
          follow(item._id)
        }
      }}>
        <Text style={styles.text2}>{item.isFollowed ? 'Following' : 'Follow'}</Text>
      </Pressable>
      </View>
      </View>
      
      </View>
        )}
      />
   </View>
  
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 33
  },
  containers: {
    gap: 10
  },
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
    flexWrap: 'wrap'
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
export default FriendsScreen