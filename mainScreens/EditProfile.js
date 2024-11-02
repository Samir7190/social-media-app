import { View, Text, StyleSheet, Image, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const [userName, setUserName] = useState('Samir Pokharel')
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
  return (
    <View style={styles.container}>
        <View style={styles.profilePicture}>
            <View style={styles.profileText}>
                <Text style={styles. text}>Profile Picture</Text>
                <Button title='Edit' onPress={() => pickImage()}/>
            </View>
            <Image style={styles.image} source={{uri: image}}/>
        </View>
        <View style={styles.userInformation}>
            <Text style={styles.text}>Name</Text>
            <TextInput
                style={styles.textInput} 
                value={userName}
                onChangeText={setUserName}
            />
            <Button title='Update '/>
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

    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        fontSize: 18,
        padding: 5
    }
})
export default EditProfile