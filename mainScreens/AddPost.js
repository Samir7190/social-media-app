import { View, Text , StyleSheet, TextInput, Button, Pressable, Image} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MyContext } from '../MyContext';

const AddPost = ({navigation}) => {
  const [text, setText] = useState('')
  const [image, setImage] = useState(null);
  const [imageMimeType, setImageMimeType] = useState(null)
  const { userId } = useContext(MyContext)
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageMimeType(result.assets[0].mimeType)
      }
  }
  const createPostWithImage = async () => {
   
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: imageMimeType, 
      name: 'photo.png' + Date.now(),
    });
    formData.append('postData', 
      JSON.stringify({ author: userId, text: `${text}`, likes: 0, date: Date.now()  })
    )
    try {
      fetch('http://192.168.1.67:3000/post', {
      method: 'POST',
      duplex: 'half',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
    alert('Post Added Successfully')
    setImage(null)
    setText('')
  } catch(error) {
    alert('Error Adding Post');
  }
  };
  const createPostWithOutImage = async () => {
    if(text == '') {
      alert('Post is empty')
    } else {
    try {
      await fetch('http:192.168.1.67:3000/post/withoutImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author: userId, text: `${text}`, likes: 0, date: Date.now()  }),
      
      })
      alert('Post Added Successfully')
      setText('')
    } catch(error) {
      alert('Error Adding Post')
    }
  }
  }
  
  return (
    <View style={styles.container}>
      <TextInput 
         multiline
         numberOfLines={4}
         placeholder="What's on your mind"
         style={styles.textinput}
         value={text}
         onChangeText={setText}
      />
      { image != null ? <Image style={styles.image2} source={{ uri: image }}/> 
        : 
        <Pressable style={styles.pressable} onPress={() => pickImage()}><Text style={styles.text}>Add an Image</Text><Image style={styles.image} source={require('../assets/imageicon.png')}/></Pressable>
      }
      <Button title='Add Post' onPress={() => { 
        if(image == null) {
          createPostWithOutImage()
        } else {
          createPostWithImage()
        }
      }
      }/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10
    },
    textinput: {
      borderWidth: 1,
      width: '58%',
      height: '20%',
      textAlign: 'center',
      fontSize: 18
    },
    image: {
      height: '100%',
      width:  '25%'
    },
    image2: {
      height: '31%',
      width: '58%'
    },
    pressable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      width: '58%',
      height: '6.5%'
    },
    text: {
      fontSize: 18
    }

})
export default AddPost