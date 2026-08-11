export default function SortMenu({ sortBy, setSortBy }) {
    return (
      <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{padding: '5px'}}>
        <option value="">Sort By: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Top Rated First</option>
      </select>
    );
  }