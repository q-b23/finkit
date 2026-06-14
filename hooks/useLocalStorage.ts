"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * SSR-safe localStorage hook for Next.js App Router.
 *
 * Reads from localStorage only after mount (client-side),
 * avoiding hydration mismatches. Falls back to `initialValue`
 * during SSR and first render.
 *
 * @param key       localStorage key
 * @param initialValue  Default value used during SSR and when no stored value exists
 * @returns [value, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Lazy initializer: start with the default so SSR/initial render matches
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Track whether we have hydrated from localStorage yet
  const [hydrated, setHydrated] = useState(false);

  // On mount only, read from localStorage
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`useLocalStorage: failed to read key "${key}"`, error);
    }
    setHydrated(true);
  }, [key]);

  // Persist to localStorage whenever value changes (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`useLocalStorage: failed to write key "${key}"`, error);
    }
  }, [key, storedValue, hydrated]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        return next;
      });
    },
    []
  );

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`useLocalStorage: failed to remove key "${key}"`, error);
    }
    setStoredValue(initialValue);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
