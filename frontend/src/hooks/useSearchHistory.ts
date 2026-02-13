import { useState, useCallback, useEffect } from 'react';

interface SearchHistoryItem {
  type: 'city' | 'location';
  value: string | { lat: number; lon: number };
  timestamp: number;
  displayName: string;
}

const STORAGE_KEY = 'weather-search-history';
const MAX_HISTORY_ITEMS = 5;

/**
 * Custom hook to manage search history with localStorage persistence
 */
export const useSearchHistory = () => {
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  }, [history]);

  const addToHistory = useCallback((item: Omit<SearchHistoryItem, 'timestamp'>) => {
    setHistory((prev) => {
      // Check if item already exists
      const exists = prev.some((h) => {
        if (h.type !== item.type) return false;
        if (item.type === 'city') {
          return h.value === item.value;
        }
        return (
          typeof h.value === 'object' &&
          typeof item.value === 'object' &&
          h.value.lat === item.value.lat &&
          h.value.lon === item.value.lon
        );
      });

      if (exists) {
        // Move to top by removing and re-adding
        const filtered = prev.filter((h) => {
          if (h.type !== item.type) return true;
          if (item.type === 'city') {
            return h.value !== item.value;
          }
          return !(
            typeof h.value === 'object' &&
            typeof item.value === 'object' &&
            h.value.lat === item.value.lat &&
            h.value.lon === item.value.lon
          );
        });
        return [{ ...item, timestamp: Date.now() }, ...filtered].slice(
          0,
          MAX_HISTORY_ITEMS
        );
      }

      // Add new item at the beginning
      return [{ ...item, timestamp: Date.now() }, ...prev].slice(
        0,
        MAX_HISTORY_ITEMS
      );
    });
  }, []);

  const removeFromHistory = useCallback((index: number) => {
    setHistory((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
};