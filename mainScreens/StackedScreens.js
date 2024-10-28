import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreens from './HomeScreens'
import Post from './Post'
import AddPost from './AddPost'
import Comment from './Comment'

const Stack = createNativeStackNavigator()

const StackedScreens = () => {
  return (
    
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen name='Home' component={HomeScreens} options={{headerShown: false}}/>
            <Stack.Screen name='Post' component={Post} />
            <Stack.Screen name='AddPost' component={AddPost} />
            <Stack.Screen name='Comment' component={Comment} />
        </Stack.Navigator>
  
  )
}

export default StackedScreens