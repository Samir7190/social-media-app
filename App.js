import { View, Text, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import StackedScreens from './mainScreens/StackedScreens'
import ProfileScreen from './mainScreens/ProfileScreen'
import FriendsScreen from './mainScreens/FriendsScreen'
import { MyProvider } from './MyContext'
import { MyContext } from './MyContext'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const App = () => {
  
  const [isLoggedIn, setIsLogedIn] = useState(false)
  return (
    <MyProvider>
    <NavigationContainer>
      {isLoggedIn ? 
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
       <Tab.Screen name='Profile' component={ProfileScreen} />
       <Tab.Screen name='Users' component={FriendsScreen} />
       </Tab.Navigator>
       : 
       <Stack.Navigator>
       <Stack.Screen name='SignIn' component={SignIn} />
       <Stack.Screen name='SignUp' component={SignUp} />
       </Stack.Navigator>
   
    }
    </NavigationContainer>
    </MyProvider>
  )
}

export default App
