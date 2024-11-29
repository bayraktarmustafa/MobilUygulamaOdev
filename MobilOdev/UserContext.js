import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    loadUserData();
  }, []);

  const saveUserData = async (userData) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUser: saveUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
