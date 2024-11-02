import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isLoggedIn, setIsLogedIn] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState()
  const [selectedUserId, setSelectedUserId] = useState()
  let token;
  let userId
  const getItem = async () => {
    token =await AsyncStorage.getItem('token')
    userId = await AsyncStorage.getItem('userId')
  } 
  useEffect(() => {
    getItem()
  }) 
  
  return (
    <MyContext.Provider value={{ isLoggedIn, setIsLogedIn, selectedPostId, setSelectedPostId, selectedUserId, setSelectedUserId, token, userId }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };