import { createContext, useContext, useReducer, useEffect } from 'react';

// ----------------------------------------------------------------------

const FavoritesContext = createContext();

// ----------------------------------------------------------------------

const STORAGE_KEY = 'dashboard-favorites';

const initialState = {
  favorites: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
};

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const newFavorites = [...state.favorites, action.payload];
      return { ...state, favorites: newFavorites };
    }
    case 'REMOVE_FAVORITE': {
      const newFavorites = state.favorites.filter(fav => fav.path !== action.payload.path);
      return { ...state, favorites: newFavorites };
    }
    case 'TOGGLE_FAVORITE': {
      const exists = state.favorites.find(fav => fav.path === action.payload.path);
      if (exists) {
        const newFavorites = state.favorites.filter(fav => fav.path !== action.payload.path);
        return { ...state, favorites: newFavorites };
      } else {
        const newFavorites = [...state.favorites, action.payload];
        return { ...state, favorites: newFavorites };
      }
    }
    case 'SET_FAVORITES': {
      return { ...state, favorites: action.payload };
    }
    default:
      return state;
  }
}

// ----------------------------------------------------------------------

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favorites));
  }, [state.favorites]);

  const addFavorite = (item) => {
    dispatch({ type: 'ADD_FAVORITE', payload: item });
  };

  const removeFavorite = (item) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: item });
  };

  const toggleFavorite = (item) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: item });
  };

  const isFavorite = (path) => {
    return state.favorites.some(fav => fav.path === path);
  };

  const value = {
    favorites: state.favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}