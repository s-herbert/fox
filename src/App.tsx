import { useState, useEffect, useRef } from 'react';
import { useBeerApi } from './hooks/useBeerApi';
import { BeerFeed } from './components/BeerFeed';
import { BeerDetail } from './components/BeerDetail';
import type { Beer } from './types/beer';
import './styles/App.css';

function App() {
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);
  const savedScrollPosition = useRef<number>(0);
  
  const {
    beers,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    reset,
  } = useBeerApi();

  // Scroll to top when detail view opens
  useEffect(() => {
    if (selectedBeer) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedBeer]);

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍺 Beer Explorer</h1>
        {error && (
          <button 
            onClick={reset}
            className="retry-button"
          >
            Retry
          </button>
        )}
      </header>

      <main className="app-main">
        {selectedBeer ? (
          <BeerDetail 
            beer={selectedBeer} 
            onBack={handleBackToFeed}
          />
        ) : (
          <BeerFeed
            beers={beers}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            error={error}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onBeerSelect={handleBeerSelect}
          />
        )}
      </main>
    </div>
  );
}

export default App;