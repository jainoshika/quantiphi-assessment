export default function Sidebar({ categories, setCategories, priceRange, setPriceRange, minRating, setMinRating }) {
    const toggleCategory = (cat) => {
      setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
    };
  
    return (
      <div className="sidebar">
        <h3>Filters</h3>
        <div className="filter-group">
          <h4>Category</h4>
          {['Electronics', 'Apparel', 'Footwear'].map(cat => (
            <label key={cat} style={{display: 'block', marginBottom: '5px'}}>
              <input type="checkbox" checked={categories.includes(cat)} onChange={() => toggleCategory(cat)} /> {cat}
            </label>
          ))}
        </div>
        
        <div className="filter-group">
          <h4>Price Range</h4>
          <input type="number" value={priceRange.min} onChange={e => setPriceRange({...priceRange, min: e.target.value})} placeholder="Min" style={{width: '60px', marginRight: '5px'}}/> to 
          <input type="number" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: e.target.value})} placeholder="Max" style={{width: '60px', marginLeft: '5px'}}/>
        </div>
  
        <div className="filter-group">
          <h4>Min Rating</h4>
          {[1, 2, 3, 4, 5].map(star => (
            <label key={star} style={{display: 'block', marginBottom: '5px'}}>
              <input type="radio" name="rating" checked={minRating === star} onChange={() => setMinRating(star)} /> {star} Stars
            </label>
          ))}
        </div>
      </div>
    );
  }