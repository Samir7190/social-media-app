import { View, Text, ScrollView, StyleSheet, FlatList, StatusBar, Pressable, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Post from './Post'
import Posts from './Posts'

const HomeScreens = ({navigation}) => {
  const [userData, setUserData] = useState([])
  useEffect(() =>{
    fetch('http://192.168.1.67:3000/post')
    .then(response => response.json()) 
    .then(response => setUserData(response))
    
    .catch(err => console.log(err)) 
  }, [userData])
  
 
  return (
    <SafeAreaView style={styles.mainApp}>
      <StatusBar backgroundColor='black'/>
        <FlatList data={userData} renderItem={({item}) =>( 
           <Posts profilePicture={item.author.profilePicture} name={item.author.name} textpost={item.text} imageUrl={item.imageUrl} likeNumber={item.likes} postId={item._id} navigation={navigation} isFollowed={item.isFollowed} isLiked={item.isLiked} UserId={item.author._id} date={item.date} hideFollow={false}/>
          )}
          keyExtractor={item => item._id}
          ListHeaderComponent={() => (
              <View style={styles.container}>
                <View style={styles.mainHeader}>
                    <Text style={styles.text} >LinkUp</Text>
                  </View> 
              </View>
          )}
          />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainApp: {
    backgroundColor: 'white'
  },
  container: {
    backgroundColor: 'white',
   
  },
  mainHeader: {
    
    justifyContent: 'center',
    padding: 10,
    borderBottomColor: '#909091',
    borderBottomWidth: 4
  },
  text: {
    fontSize: 24,
    color: 'blue'
  }
})
export default HomeScreens