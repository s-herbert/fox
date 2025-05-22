import { useRef, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void | Promise<void>;
  isLoading?: boolean;
  hasMore?: boolean;
  threshold?: number;
  rootMargin?: string;
}

interface UseInfiniteScrollReturn {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export const useInfiniteScroll = ({
  onLoadMore,
  isLoading = false,
  hasMore = true,
  threshold = 0.1,
  rootMargin = '100px',
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting && !isLoading && hasMore) {
        onLoadMore();
      }
    },
    [onLoadMore, isLoading, hasMore]
  );

  useEffect(() => {
    const sentinelElement = sentinelRef.current;
    
    if (!sentinelElement) {
      return;
    }

    // remove existing observer if exists
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(sentinelElement);

    // Cleanup
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin]);

  return {
    sentinelRef,
  };
};