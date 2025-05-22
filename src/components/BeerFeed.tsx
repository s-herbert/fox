import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import type { Beer } from '../types/beer';
import '../styles/BeerFeed.css';

interface BeerFeedProps {
  beers: Beer[];
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onBeerSelect: (beer: Beer) => void;
  reset: () => void;
}

export const BeerFeed = ({
  beers,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  onLoadMore,
  onBeerSelect,
  reset,
}: BeerFeedProps) => {
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore,
    isLoading: isLoadingMore,
    hasMore,
    threshold: 0.1,
    rootMargin: '50px',
  });

  if (error) {
    return (
      <div className="beer-feed-error">
        <p>❌ {error}</p>
        {error && (
          <button
            onClick={reset}
            className="retry-button"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (isLoading && beers.length === 0) {
    return (
      <div className="beer-feed-loading">
        <p>🍺 Pouring beers...</p>
      </div>
    );
  }

  return (
    <div className="beer-feed">
      <div className="beer-list">
        {beers.map((beer) => (
          <div
            key={beer.id}
            className="beer-item"
            onClick={() => onBeerSelect(beer)}
          >
            <div className="beer-content">
              <h3 className="beer-name">{beer.name}</h3>
              <p className="beer-tagline">{beer.tagline}</p>
              <div className="beer-abv">
                <span className="abv-label">ABV:</span>
                <span className="abv-value">{beer.abv}%</span>
              </div>
            </div>
            <div className="beer-arrow">→</div>
          </div>
        ))}
      </div>

      {isLoadingMore && (
        <div className="loading-more">
          <p>🍻 Pouring more beers...</p>
        </div>
      )}

      {!hasMore && beers.length > 0 && (
        <div className="end-of-results">
          <p> Tapped out! </p>
        </div>
      )}

      {hasMore && !isLoadingMore && (
        <div ref={sentinelRef} className="scroll-sentinel" />
      )}
    </div>
  );
};
