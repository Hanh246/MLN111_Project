import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dailyReflections';

/**
 * Custom hook to manage daily reflections with localStorage
 */
export function useReflection(currentDate) {
  const dateKey = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
  const [reflection, setReflection] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  // Load reflection for current date
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const reflections = JSON.parse(stored);
        setReflection(reflections[dateKey] || '');
      } else {
        setReflection('');
      }
    } catch (error) {
      console.error('Error loading reflection:', error);
      setReflection('');
    }
  }, [dateKey]);

  // Save reflection to localStorage
  const saveReflection = useCallback((value) => {
    setReflection(value);
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const reflections = stored ? JSON.parse(stored) : {};
      
      if (value.trim()) {
        reflections[dateKey] = value;
      } else {
        delete reflections[dateKey];
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving reflection:', error);
    }
  }, [dateKey]);

  return {
    reflection,
    saveReflection,
    lastSaved,
  };
}
