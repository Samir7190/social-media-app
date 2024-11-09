import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isLoggedIn, setIsLogedIn] = useState(null)
  const [selectedPostId, setSelectedPostId] = useState()
  const [selectedUserId, setSelectedUserId] = useState()
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const follow = (userIds, userId) => {
    fetch('http://192.168.1.67:3000/follow', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userIds, followerId: userId})
    })
    .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
  const unFollow = (userIds, userId) => {
    fetch('http://192.168.1.67:3000/unfollow', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: userIds, followerId: userId})
      })
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
  useEffect(() => {
    const getItem = async () => {
      try{
      const token = await AsyncStorage.getItem('token')
      const userId = await AsyncStorage.getItem('userId')
      setToken(token)
      setUserId(userId)
    } catch(error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }
  }    
    getItem() 
  }, [token]) 
  
  return (
    <MyContext.Provider value={{ isLoggedIn, setIsLogedIn, selectedPostId, setSelectedPostId, selectedUserId, setSelectedUserId, token, setToken, userId, isLoading, setIsLoading, follow, unFollow   }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };