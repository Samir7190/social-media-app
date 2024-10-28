import { View, Text, Image, StyleSheet, useWindowDimensions, Pressable } from 'react-native'
import React, {useContext, useState} from 'react'
import { MyContext } from '../MyContext'
const Posts = ({profilePicture, name, textpost, imageUrl, likeNumber, postId, navigation}) => {
  const [number, setNumber] = useState(0)
  const {selectedPostId, setSelectedPostId} = useContext(MyContext)
  const {height, width} = useWindowDimensions();
  const increaseLIke = () => {
  
    fetch(`http://192.168.1.67:3000/post/${postId}`, {
      method: "PATCH"
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err)) 
    setNumber(number => number + 1)
  }
  const decreaseLike = () => {
    fetch(`http://192.168.1.67:3000/post/decrease`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: `${postId}`  }),
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err))
    setNumber(number => number - 1)
  }
  const gotoComment = () => {
    setSelectedPostId(postId)
    navigation.navigate('Comment')
  }
  return (
    <View style={styles.container}>
      <View style={styles.headers}>
      <View style={styles.header}>
        <Image style={styles.image} source={require('../mushashi.webp')} />
        <Text style={styles.text}>{name}</Text>
      </View>
      <Pressable><Text>Following</Text></Pressable>
      </View>
        <Text style={styles.textpost}>
        {textpost}
      </Text>
      
      {imageUrl != '' && <Image style={{height: width, width: width}} source={{uri: imageUrl}} />} 
      <View style={styles.end}>
        <Pressable onPress={() => {
          if(number == 0) {
            increaseLIke()
          } else{
            decreaseLike()
          }
        }} style={{width: width / 3.2, borderWidth: 1, borderRadius: 100, height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5}}>
        <Image style={styles.image2} source={require('../assets/like.png')} />
        <Text>{likeNumber}</Text>
        </Pressable>
        <Pressable onPress={() => gotoComment()} style={{width: width / 3.2, borderWidth: 1, borderRadius: 100, height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5}}>
        <Image style={styles.image2} source={require('../assets/comment.png')} />
        <Text>comment</Text>
        </Pressable>
        <Pressable style={{width: width / 3.2, borderWidth: 1, borderRadius: 100, height: 40, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5}}>
        <Image style={styles.image2} source={require('../assets/share.png')} />
        <Text style={styles.text2}>
          Share</Text>
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
        gap: 10
    },
    headers: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 50
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 100
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
      
    },
    textpost: {
      paddingLeft: 8,
      paddingRight: 8,
      fontSize: 18
    }
})
export default Posts