import { useRef, useState, useEffect } from 'react';
import type { Beer } from '../types/beer';

interface UseScrollPosition {
  selectedBeer: Beer | null,
  handleBeerSelect: (beer: Beer) => void,
  handleBackToFeed: () => void,
}

export const useScrollPosition = (): UseScrollPosition => {
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);
  const savedScrollPosition = useRef<number>(0);
  const handleBeerSelect = (beer: Beer) => {
    // Save current scroll position before navigating
    savedScrollPosition.current = window.scrollY;
    setSelectedBeer(beer);
  };

  const handleBackToFeed = () => {
    setSelectedBeer(null);
    // Restore scroll position, setTimeout to ensure DOM is finished rendering.
    setTimeout(() => {
      window.scrollTo({ top: savedScrollPosition.current, behavior: 'smooth' });
    }, 0);
  };

  // Scroll to top when detail view opens
  useEffect(() => {
    if (selectedBeer) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedBeer]);

  return {
    handleBackToFeed,
    handleBeerSelect,
    selectedBeer,
  }
}
