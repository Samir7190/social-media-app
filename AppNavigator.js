import React, { useContext, useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import StackedScreens from './mainScreens/StackedScreens'
import ProfileScreen from './mainScreens/ProfileScreen'
import FriendsScreen from './mainScreens/FriendsScreen'

import { MyProvider } from './MyContext'
import { MyContext } from './MyContext'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddPost from './mainScreens/AddPost'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const AppNavigator = () => {
  
  const {token, isLoading, setIsLoading} = useContext(MyContext)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }                       
  return (
    
    <NavigationContainer>
      {token != null ? 
       <Tab.Navigator 
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {   
          let iconName;
  
          if (route.name === 'home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'account'
              : 'account';
          } else if (route.name === 'Users') {
            iconName = focused
              ? 'account-group'
              : 'account-group'
          } else if (route.name === 'AddPost') {
            iconName = focused
              ? 'plus-circle'
              : 'plus-circle-outline'
          }
  
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel: false
      })}
       >
       <Tab.Screen name='home' component={StackedScreens} />
       <Tab.Screen name='AddPost' component={AddPost} />
       <Tab.Screen name='Profile' component={ProfileScreen} />
       <Tab.Screen name='Users' component={FriendsScreen} />
       </Tab.Navigator>
       : 
       <Stack.Navigator screenOptions={{ headerShown: true}}>
       <Stack.Screen name='SignIn' component={SignIn} />
       <Stack.Screen name='SignUp' component={SignUp} />

       </Stack.Navigator>
   
    }
  
    </NavigationContainer>
    
  )
  
}

export default AppNavigator
