import { View, Text, StyleSheet, Image, Button, TextInput, Pressable, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { MyContext } from '../MyContext';

const EditProfile = () => {
  const [user, setUser] = useState()
  const [userName, setUserName] = useState('')
  const [userImage, setUserImage] = useState()
  const [image, setImage] = useState(null);
  const [imageMimeType, setImageMimeType] = useState(null)
  const [disabledState, setDisableState] = useState(true)
  const [disabledState2, setDisableState2] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const {userId} = useContext(MyContext)
  useEffect(() => {
    const fetchUser = async () => {
    try {
    const response = await fetch(`http://192.168.1.67:3000/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: userId }),
      
      })
    const data = await response.json()
    setUser(data.user)
    setUserName(data.user.name)
    setUserImage(data.user.profilePicture)
    } catch(error) {
        console.log(error)
    } finally {
        setIsLoading(false)
    }
}
    fetchUser()
  }, [])
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
        fetch(`http://192.168.1.67:3000/updateProfilePicture/${userId}`, {
            method: 'POST',
            headers: {
                'Content-type': 'multipart/form-data'
            },
            body: formData
        })
        console.log(formData)
        console.log(formData._parts)
        alert('Profile Picture updated successfully')
    } catch(error) {
        alert(error) 
    }
  }
  const handleTextChange = (input) => {
    setUserName(input)
    setDisableState2(false)
  }
  const changeName = () => {
    try {
    fetch(`http://192.168.1.67:3000/update`, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ id: userId, name: userName})
    })
    alert('Successfully Updated')
    } catch(error) {
        console.log(error)
    }  
}
  if(isLoading) {
    return (
        <SafeAreaView style={styles.loading}>
            <ActivityIndicator size='large' color='green' />
            <Text>Loading...</Text>
        </SafeAreaView>
    )
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
            <Image style={styles.image} source={{uri: image ? image : userImage}}/>
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
                onChangeText={handleTextChange}
            />
            <Button title='Update Name'  onPress={() => changeName()} disabled={disabledState2}/>
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
    },
    loading: {
        flex: 1,

    }
})
export default EditProfile