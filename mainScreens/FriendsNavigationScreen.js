import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Users from './Users'
import Followers from './Followers'
import Following from './Following'

const Tab = createMaterialTopTabNavigator()

const FriendsNavigationScreen = () => {
  return (
    
      <Tab.Navigator>
        <Tab.Screen name='Users' component={Users}/>
        <Tab.Screen name='Following' component={Following}/>
        <Tab.Screen name='Followers' component={Followers}/>
      </Tab.Navigator>

  )
}

export default FriendsNavigationScreen