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
}

export const BeerFeed = ({
  beers,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  onLoadMore,
  onBeerSelect,
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
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  if (isLoading && beers.length === 0) {
    return (
      <div className="beer-feed-loading">
        <p>🍺 Loading delicious beers...</p>
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

      {/* Loading more indicator */}
      {isLoadingMore && (
        <div className="loading-more">
          <p>🍻 Loading more beers...</p>
        </div>
      )}

      {/* End of results indicator */}
      {!hasMore && beers.length > 0 && (
        <div className="end-of-results">
          <p>🎉 That's all the beers we have!</p>
        </div>
      )}

      {/* Infinite scroll sentinel */}
      {hasMore && !isLoadingMore && (
        <div ref={sentinelRef} className="scroll-sentinel" />
      )}
    </div>
  );
};
