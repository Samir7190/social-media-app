import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { MyContext } from '../MyContext'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const Posts = ({profilePicture, name, textpost, imageUrl, likeNumber, postId, navigation, isFollowed, isLiked, userId}) => {
  const {selectedPostId, setSelectedPostId} = useContext(MyContext)
  const {selectedUserId, setSelectedUserId} = useContext(MyContext)
  const {height, width} = useWindowDimensions();
  const [likeIcon, setLikeIcon] = useState('')
  useEffect(() => {
    if(isLiked == true) {
      setLikeIcon('thumb-up')
    } else {
      setLikeIcon('thumb-up-outline')
    }
  }, [isLiked])
  
  const increaseLIke = () => {
    
    fetch(`http://192.168.1.67:3000/post/${postId}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ userId: '671ce9ab7833974f431db2bb'})
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err)) 
    
  }
  const decreaseLike = () => {
    fetch(`http://192.168.1.67:3000/post/decrease`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: `${postId}`, userId: '671ce9ab7833974f431db2bb'  }),
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err))
    
  }
  const follow = () => {
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
  const unFollow = () => {
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
  const gotoComment = () => {
    setSelectedPostId(postId)
    navigation.navigate('Comment')
  }
  const goToProfile = () => {
    setSelectedUserId(userId)
    navigation.navigate('OthersProfileScreen')
  }
  return (
    <View style={styles.container}>
      <View style={styles.headers}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: profilePicture }} />
        <View style={styles.namesandfollow}>
      
        <Text style={styles.text} onPress={() => goToProfile()}>{name} </Text>
        <Text style={{fontSize: 20, color: 'grey'}}> 2d </Text>
      
      
        <Pressable onPress={() => {
        if(isFollowed == true) {
          unFollow()
        } else{
          follow()
        }
      }}>
        <Text style={styles.text2}>{isFollowed ? 'Following' : 'Follow'}</Text>
      </Pressable>
    
        
        
      </View>
      </View>
      
      </View>
        <Text style={styles.textpost}>
        {textpost}
      </Text>
      
      {imageUrl != '' && <Image style={{height: width, width: width}} source={{uri: imageUrl}} />} 
      <View style={styles.end}>
        <Animated.View style={[animatedView]}>
        <Pressable onPress={() => {
          if(isLiked == true) {
            decreaseLike()

          } else{
            increaseLIke()
          }
        }} style={{width: width / 3.2, borderWidth: 1, borderRadius: 100, height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5}}>
        {/* <Image style={styles.image2} source={require('../assets/like.png')} /> */}
        <Icon name={likeIcon} size={30} /> 
        <Text>{likeNumber}</Text>
        </Pressable>
        </Animated.View>
        <Pressable onPress={() => gotoComment()} style={{width: width / 3.2, borderWidth: 1, borderRadius: 100, height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5}}>
        <Image style={styles.image2} source={require('../assets/comment.png')} />
        <Text>comment</Text>
        </Pressable>
        <Pressable style={{width: width / 3.2, borderWidth: 1, borderRadius: 100, height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5}}>
        <Image style={styles.image2} source={require('../assets/share.png')} />
        <Text>Share</Text>
        </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      gap: 10,
      borderBottomColor: '#909091',
      borderBottomWidth: 8,
      
      paddingBottom: 5
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingLeft: 3
    },
    headers: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 1,
      flexWrap: 'wrap'
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 100
    },
    namesandfollow: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24
    }, 
    presssable: {
        borderRadius: 100,
        borderWidth: 1,
        
    },
    end: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    image2: {
      height: 20,
      width: 20,
      
    },
    text2: {
      fontSize: 18,
      fontWeight: 'bold', 
      color: 'blue'
    },
    textpost: {
      paddingLeft: 8,
      paddingRight: 8,
      fontSize: 18,
      flex: 1,
      flexWrap: 'wrap'
    }
})
export default Posts