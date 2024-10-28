import React, { createContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isLoggedIn, setIsLogedIn] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState()
  return (
    <MyContext.Provider value={{ isLoggedIn, setIsLogedIn, selectedPostId, setSelectedPostId }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };