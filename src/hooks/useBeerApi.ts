import { useState, useCallback, useRef, useEffect } from 'react';
import type { Beer } from '../types/beer';

interface UseBeerApi {
  beers: Beer[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  reset: () => void;
}

const BEERS_PER_PAGE = 10;
const BASE_URL = 'https://punkapi.online/v3/beers';

export const useBeerApi = (): UseBeerApi => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const currentPageRef = useRef(1);
  const isInitialLoadRef = useRef(true);

  const fetchBeers = useCallback(async (page: number): Promise<Beer[]> => {
    const url = `${BASE_URL}?page=${page}&per_page=${BEERS_PER_PAGE}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch beers: ${response.status} ${response.statusText}`);
      }
      
      const data: Beer[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while fetching beers');
    }
  }, []);

  const loadMore = useCallback(async () => {
    const isInitialLoad = isInitialLoadRef.current;
    
    // allow initial load even if isLoading is true
    if ((!isInitialLoad && isLoading) || isLoadingMore || !hasMore) {
      return;
    }
    
    if (isInitialLoad) setIsLoading(true);
    else setIsLoadingMore(true);

    setError(null);

    try {
      const newBeers = await fetchBeers(currentPageRef.current);
      
      // Update beers
      if (isInitialLoad) {
        setBeers(newBeers);
      } else {
        setBeers(prev => [...prev, ...newBeers]);
      }
      
      // Update pagination
      setHasMore(newBeers.length === BEERS_PER_PAGE);
      currentPageRef.current += 1;
      isInitialLoadRef.current = false;
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load beers');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore, hasMore, fetchBeers]);

  const reset = useCallback(() => {
    setBeers([]);
    setIsLoading(true);
    setIsLoadingMore(false);
    setError(null);
    setHasMore(true);
    currentPageRef.current = 1;
    isInitialLoadRef.current = true;
  }, []);

  // load initial data
  useEffect(() => {
    if (isInitialLoadRef.current && beers.length === 0 && !error) {
      loadMore();
    }
  }, [loadMore, beers.length, error]);

  return {
    beers,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    reset,
  };
};