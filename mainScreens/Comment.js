import { View, Text, FlatList, Pressable, StyleSheet, Image, SafeAreaView, TextInput, Button } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { MyContext } from '../MyContext'

const Comment = () => {
  const [comments, setComments] = useState()
  const [userComment, setUserComment] = useState('')
  const {selectedPostId, userId} = useContext(MyContext)
  useEffect(() => {
    fetch(`http://192.168.1.67:3000/post/${selectedPostId}`)
    .then(response => response.json())
    .then(response => setComments(response.comments))
    .catch(err => console.log(err)) 
  })
  const addComment = () => {
    fetch('http:192.168.1.67:3000/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cid: userId, postId: `${selectedPostId}`, comment: userComment }),
    
    })
    setUserComment('')
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.addComment}>
        <TextInput style={styles.textInput} placeholder='Write a comment' value={userComment} onChangeText={setUserComment}/>
        <Pressable style={styles.addCommentButton}
        onPress={() => {
          if(userComment == '') {
            alert('Comment is empty')
          } else{
            addComment()
            alert('Comment Added Successfully')
          }
        }}
        >
          <Text style={styles.commentText}>Add</Text>
          </Pressable>
      </View>
      <FlatList 
        data={comments}
        renderItem={({item}) => (
        
          <View style={styles.container}>
            
          <Image style={styles.image} source={{uri: item.commenter.profilePicture}}/>
          <View style={styles.comment}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.commenter.name}</Text>
          <Text style={{fontSize: 18}}>{item.comment}</Text>
          </View>
        </View>
        )}
        ListFooterComponent={<View style={{ height: 45 }} />}
      />
      
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    padding: 10
  },
  container: {
    padding: 5,
    flexDirection: 'row',
    gap: 10,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100
  },
  comment: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexWrap: 'nowrap',
    flexShrink: 1,
    padding: 5
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 100,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    backgroundColor: 'white',
    width: 350
  },
  addComment: {
    flexDirection: 'row',
    gap: 11
  },
  addCommentButton: {
    height: 50,
    borderWidth: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#144696'

  },
  commentText: {
    fontSize: 20,
    color: 'white'
  }
})
export default Comment