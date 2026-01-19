import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'favoriteQuotes';

/**
 * Custom hook to manage favorite quotes with localStorage
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  // Add a quote to favorites
  const addFavorite = useCallback((quote) => {
    setFavorites(prev => {
      // Check if already exists
      const exists = prev.some(
        fav => fav.month === quote.month && fav.day === quote.day
      );
      if (exists) return prev;
      
      return [...prev, quote];
    });
  }, []);

  // Remove a quote from favorites
  const removeFavorite = useCallback((quote) => {
    setFavorites(prev =>
      prev.filter(fav => !(fav.month === quote.month && fav.day === quote.day))
    );
  }, []);

  // Check if a quote is favorited
  const isFavorite = useCallback((quote) => {
    if (!quote) return false;
    return favorites.some(
      fav => fav.month === quote.month && fav.day === quote.day
    );
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback((quote) => {
    if (isFavorite(quote)) {
      removeFavorite(quote);
    } else {
      addFavorite(quote);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
}
