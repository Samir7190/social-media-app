import { View, Text , StyleSheet, TextInput, Button, Pressable, Image} from 'react-native'
import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';

const AddPost = ({navigation}) => {
  const [text, setText] = useState('')
  const [image, setImage] = useState(null);
  const [imageMimeType, setImageMimeType] = useState(null)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageMimeType(result.assets[0].mimeType)

      console.log(image)
     
    }
  }
  const uploadImage = async () => {
    
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: imageMimeType, 
      name: 'photo.png' + Date.now(),
    });
    formData.append('postData', 
      JSON.stringify({ author: "6724b241c29533e66b655150", text: `${text}`, likes: 0  })
    )
    console.log(formData)
    console.log(formData._parts)
    try {
      fetch('http://192.168.1.67:3000/post', {
      method: 'POST',
      duplex: 'half',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
    
  } catch(error) {
    console.error('Error uploading image:', error);
  }
  };
  const createPost = () => {
    fetch('http:192.168.1.67:3000/post/withoutImage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ author: "671ce8cf7833974f431db2b0", text: `${text}`, likes: 0  }),
    
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err)) 
    navigation.navigate('Home')
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
        <Pressable style={styles.pressable} onPress={() => pickImage()}><Text style={styles.text}>Add An image</Text><Image style={styles.image} source={require('../assets/imageicon.png')}/></Pressable>
      }
      <Button title='Add Post' onPress={() => { 
        if(image == null) {
          createPost()
        } else {
          uploadImage()
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
      width: 250,
      height: 150,
      textAlign: 'center',
      fontSize: 18
    },
    image: {
      height: 50,
      width: 50
    },
    image2: {
      height: 250,
      width: 250
    },
    pressable: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      width: 250
    },
    text: {
      fontSize: 18
    }

})
export default AddPost