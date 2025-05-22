import { useBeerApi } from './hooks/useBeerApi';
import { BeerFeed } from './components/BeerFeed';
import { BeerDetail } from './components/BeerDetail';
import './styles/App.css';
import { useScrollPosition } from './hooks/useScrollPosition';

function App() {
  const {
    beers,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    reset,
  } = useBeerApi();

  const {selectedBeer, handleBackToFeed, handleBeerSelect} = useScrollPosition();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🍺 Beer List</h1>
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
            reset={reset}
          />
        )}
      </main>
    </div>
  );
}

export default App;