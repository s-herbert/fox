import type { Beer } from '../types/beer';
import '../styles/BeerDetail.css';

interface BeerDetailProps {
  beer: Beer;
  onBack: () => void;
}

const BASE_IMAGE_URL = 'https://punkapi.online/v3/images';

export const BeerDetail = ({ beer, onBack }: BeerDetailProps) => {
  const imageUrl = beer.image ? `${BASE_IMAGE_URL}/${beer.image}` : null;

  return (
    <div className="beer-detail">
      <button onClick={onBack} className="back-button">
        ← Back to Feed
      </button>

      <div className="beer-detail-content">
        <div className="beer-detail-header">
          {imageUrl && (
            <div className="beer-image-container">
              <img 
                src={imageUrl} 
                alt={beer.name}
                className="beer-image"
                onError={(e) => {
                  // no image if error
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <div className="beer-info">
            <h1 className="beer-title">{beer.name}</h1>
            <p className="beer-tagline">{beer.tagline}</p>
            <div className="beer-abv">
              <span className="abv-label">ABV:</span>
              <span className="abv-value">{beer.abv}%</span>
            </div>
          </div>
        </div>

        <div className="beer-description">
          <h2>Description</h2>
          <p>{beer.description}</p>
        </div>

        <div className="beer-ingredients">
          <h2>Ingredients</h2>
          
          {beer.ingredients.malt && beer.ingredients.malt.length > 0 && (
            <div className="ingredient-section">
              <h3>Malt</h3>
              <ul className="ingredient-list">
                {beer.ingredients.malt.map((malt, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-name">{malt.name}</span>
                    <span className="ingredient-amount">
                      {malt.amount.value} {malt.amount.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {beer.ingredients.hops && beer.ingredients.hops.length > 0 && (
            <div className="ingredient-section">
              <h3>Hops</h3>
              <ul className="ingredient-list">
                {beer.ingredients.hops.map((hop, index) => (
                  <li key={index} className="ingredient-item">
                    <span className="ingredient-name">{hop.name}</span>
                    <span className="ingredient-details">
                      {hop.amount.value} {hop.amount.unit}
                      {hop.add && <span className="hop-add"> • {hop.add}</span>}
                      {hop.attribute && <span className="hop-attribute"> • {hop.attribute}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {beer.ingredients.yeast && (
            <div className="ingredient-section">
              <h3>Yeast</h3>
              <p className="yeast-info">{beer.ingredients.yeast}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};