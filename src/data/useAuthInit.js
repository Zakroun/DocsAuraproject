// src/hooks/useAuthInit.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserById } from '../data/authslice';

export default function useAuthInit() {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          const userId = parsedUser.id || parsedUser.value?.id;
          
          if (userId) {
            await dispatch(fetchUserById(userId));
          } else {
            clearAuthData();
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          clearAuthData();
        }
      }
    };

    const clearAuthData = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    };

    initializeAuth();
  }, [dispatch]);
}