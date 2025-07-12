import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Set default axios header
  useEffect(() => {
    if (state.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [state.token]);

  // Load user on app start
  useEffect(() => {
    const loadUser = async () => {
      if (state.token) {
        try {
          const response = await axios.get('/api/auth/me');
          dispatch({ type: 'LOAD_USER', payload: response.data.user });
        } catch (error) {
          console.error('Error loading user:', error);
          dispatch({ type: 'AUTH_ERROR' });
          localStorage.removeItem('token');
        }
      } else {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };

    loadUser();
  }, [state.token]);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
      
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
      
      return { success: true, user };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  // Update user profile
  const updateUser = async (userData) => {
    try {
      const response = await axios.put('/api/auth/profile', userData);
      dispatch({ type: 'UPDATE_USER', payload: response.data.user });
      return { success: true, user: response.data.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      return { success: false, error: message };
    }
  };

  const value = {
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;