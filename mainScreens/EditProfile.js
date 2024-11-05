import { View, Text, StyleSheet, Image, Button, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const [userName, setUserName] = useState('Samir Pokharel')
  const [image, setImage] = useState(null);
  const [imageMimeType, setImageMimeType] = useState(null)
  const [disabledState, setDisableState] = useState(true)
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
        setDisableState(false)
      console.log(image)
      
     
    }
  }
  const updatePicture = () => {
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: imageMimeType, 
      name: 'photo.png' + Date.now(),
    });
    console.log(formData)
    try {
        fetch('http://192.168.1.67:3000/updateProfilePicture/671ce8cf7833974f431db2b0', {
            method: 'POST',
            headers: {
                'Content-type': 'multipart/form-data'
            },
            body: formData
        })
        console.log(formData)
        console.log(formData._parts)
    } catch(error) {
        alert(error) 
    }
  }
  const changeName = () => {
    try {
    fetch(`http://192.168.1.67:3000/update`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ id: '671fa284d3eb2c5d57336251', name: userName})
    })
    alert('Successfully Updated')
    } catch(error) {
        console.log(error)
    }  
}
  return (
    <View style={styles.container}>
        <View style={styles.profilePicture}>
            <View style={styles.profileText}>
                <Text style={styles. text}>Profile Picture</Text>
                <Button title='Edit' onPress={() => {
                    pickImage()
                }}/>
            </View>
            <Image style={styles.image} source={{uri: image}}/>
        </View>
        <View style={styles.buttonContainer}>
        <Button title='Update Profile Picture' disabled={disabledState} onPress={() => updatePicture()}/>
        </View>
       
        <View style={styles.userInformation}> 
            <Text style={styles.text}>Name</Text>
            <View style={styles.input}>
            <TextInput
                style={styles.textInput} 
                value={userName}
                onChangeText={setUserName}
            />
            <Button title='Update'  onPress={() => changeName()}/>
            </View>
            
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {

    },
    profileText: {
        flexDirection: 'row',
        gap: 240,
        marginTop: 5
    },
    profilePicture: {
        alignItems: 'center'
    },
    image: {
        height: 150,
        width: 150,
        borderWidth: 1,
        borderRadius: 100
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    text2: {
        fontSize: 24,
        color: 'white'
    },
    editButton: {
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    userInformation: {
        padding: 10,
        gap: 5
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        fontSize: 18,
        padding: 5,
        flex: 1,
    },
    buttonContainer: {
        alignItems: 'center'
    },
    input: {
        flexDirection: 'row'
    }
})
export default EditProfile