import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  items: [],
  featuredItems: [],
  userItems: [],
  swaps: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    size: '',
    condition: '',
    search: '',
    minPoints: '',
    maxPoints: '',
    sort: 'createdAt',
    order: 'desc',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  },
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload.items,
        pagination: {
          ...state.pagination,
          ...action.payload.pagination,
        },
        loading: false,
      };
    case 'SET_FEATURED_ITEMS':
      return {
        ...state,
        featuredItems: action.payload,
      };
    case 'SET_USER_ITEMS':
      return {
        ...state,
        userItems: action.payload,
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [action.payload, ...state.items],
        userItems: [action.payload, ...state.userItems],
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        userItems: state.userItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        userItems: state.userItems.filter(item => item.id !== action.payload),
      };
    case 'SET_SWAPS':
      return {
        ...state,
        swaps: action.payload,
      };
    case 'ADD_SWAP':
      return {
        ...state,
        swaps: [action.payload, ...state.swaps],
      };
    case 'UPDATE_SWAP':
      return {
        ...state,
        swaps: state.swaps.map(swap =>
          swap.id === action.payload.id ? action.payload : swap
        ),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: {
          category: '',
          size: '',
          condition: '',
          search: '',
          minPoints: '',
          maxPoints: '',
          sort: 'createdAt',
          order: 'desc',
        },
      };
    case 'SET_PAGINATION':
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const setItems = (items, pagination) => {
    dispatch({
      type: 'SET_ITEMS',
      payload: { items, pagination },
    });
  };

  const setFeaturedItems = (items) => {
    dispatch({ type: 'SET_FEATURED_ITEMS', payload: items });
  };

  const setUserItems = (items) => {
    dispatch({ type: 'SET_USER_ITEMS', payload: items });
  };

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateItem = (item) => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
  };

  const deleteItem = (itemId) => {
    dispatch({ type: 'DELETE_ITEM', payload: itemId });
  };

  const setSwaps = (swaps) => {
    dispatch({ type: 'SET_SWAPS', payload: swaps });
  };

  const addSwap = (swap) => {
    dispatch({ type: 'ADD_SWAP', payload: swap });
  };

  const updateSwap = (swap) => {
    dispatch({ type: 'UPDATE_SWAP', payload: swap });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const setPagination = (pagination) => {
    dispatch({ type: 'SET_PAGINATION', payload: pagination });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    clearError,
    setItems,
    setFeaturedItems,
    setUserItems,
    addItem,
    updateItem,
    deleteItem,
    setSwaps,
    addSwap,
    updateSwap,
    setFilters,
    resetFilters,
    setPagination,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;