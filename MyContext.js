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
    <MyContext.Provider value={{ isLoggedIn, setIsLogedIn, selectedPostId, setSelectedPostId, selectedUserId, setSelectedUserId, token, setToken, userId, isLoading, setIsLoading   }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };