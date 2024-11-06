import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isLoggedIn, setIsLogedIn] = useState(null)
  const [selectedPostId, setSelectedPostId] = useState()
  const [selectedUserId, setSelectedUserId] = useState()
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [fakeToken, setFakeToken] = useState(null)
  const fakeLogIn = () => {
    setFakeToken('asdfjkl')
    console.log('Logged In')
  }
  useEffect(() => {
    const getItem = async () => {
      const token = await AsyncStorage.getItem('token')
      const userId = await AsyncStorage.getItem('userId')
      setToken(token)
      setUserId(userId)
    }
    getItem() 
  }, []) 
  
  return (
    <MyContext.Provider value={{ isLoggedIn, setIsLogedIn, selectedPostId, setSelectedPostId, selectedUserId, setSelectedUserId, token, setToken, userId, fakeToken, setFakeToken, fakeLogIn }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };