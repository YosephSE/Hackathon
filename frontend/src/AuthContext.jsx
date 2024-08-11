import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [status, setStatus] = useState({ loggedIn: false, user: '' });
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await api.get('/status');
        setStatus({ loggedIn: response.data.loggedIn, user: response.data.user , userId: response.data.userId});
      } catch (err) {
        setStatus({ loggedIn: false, user: '' });
      }
    };
    checkStatus();
  }, [])

  const refreshStatus = async () => {
    try {
      const response = await api.get('/status');
      setStatus({ loggedIn: response.data.loggedIn, user: response.data.user, userId: response.data.userId });
    } catch (err) {
      setStatus({ loggedIn: false, user: '' });
    }
  };
  return (
    <AuthContext.Provider value={{ status, refreshStatus }}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => {
    return useContext(AuthContext);
};
