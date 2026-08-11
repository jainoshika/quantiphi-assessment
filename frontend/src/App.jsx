// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from './components/Sidebar';
// import ProductGrid from './components/ProductGrid';
// import SortMenu from './components/SortMenu';
// import './App.css';

// function App() {
//   const [products, setProducts] = useState([]);
  
//   const [categories, setCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
//   const [minRating, setMinRating] = useState(0);
//   const [sortBy, setSortBy] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const categoryQuery = categories.length > 0 ? categories.join(',') : '';
//         const response = await axios.get('http://localhost:3000/api/products', {
//           params: {
//             category: categoryQuery,
//             minPrice: priceRange.min,
//             maxPrice: priceRange.max,
//             minRating: minRating,
//             sortBy: sortBy
//           }
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, [categories, priceRange, minRating, sortBy]);

//   const resetFilters = () => {
//     setCategories([]);
//     setPriceRange({ min: 0, max: 1000 });
//     setMinRating(0);
//     setSortBy('');
//   };

//   return (
//     <div className="app-container">
//       <Sidebar 
//         categories={categories} setCategories={setCategories}
//         priceRange={priceRange} setPriceRange={setPriceRange}
//         minRating={minRating} setMinRating={setMinRating}
//       />
      
//       <div className="main-content">
//         <div className="header">
//           <h1>Product Catalog</h1>
//           <SortMenu sortBy={sortBy} setSortBy={setSortBy} />
//         </div>
        
//         {products.length === 0 ? (
//           <div style={{textAlign: 'center', marginTop: '50px'}}>
//             <h2>No items match your criteria.</h2>
//             <button onClick={resetFilters} style={{padding: '10px 20px', cursor: 'pointer', background: 'blue', color: 'white', border: 'none', borderRadius: '4px'}}>
//               Reset filters
//             </button>
//           </div>
//         ) : (
//           <ProductGrid products={products} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// 1. Sidebar Component
function Sidebar({ categories, setCategories, priceRange, setPriceRange, minRating, setMinRating }) {
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
        <input type="number" value={priceRange.min} onChange={e => setPriceRange({...priceRange, min: e.target.value})} style={{width: '60px', marginRight: '5px'}}/> to 
        <input type="number" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: e.target.value})} style={{width: '60px', marginLeft: '5px'}}/>
      </div>

      <div className="filter-group">
        <h4>Min Rating</h4>
        {[1, 2, 3, 4, 5].map(star => (
          <label key={star} style={{display: 'block', marginBottom: '5px'}}>
            <input type="radio" checked={minRating === star} onChange={() => setMinRating(star)} /> {star} Stars
          </label>
        ))}
      </div>
    </div>
  );
}

// 2. Product Grid Component
function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map(p => (
        <div key={p.id} className="product-card">
          <img src={p.image} alt={p.name} />
          <h4>{p.name}</h4>
          <p style={{fontWeight: 'bold'}}>${p.price}</p>
          <p>Rating: {p.rating} / 5</p>
        </div>
      ))}
    </div>
  );
}

// 3. Sort Menu Component
function SortMenu({ sortBy, setSortBy }) {
  return (
    <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{padding: '5px'}}>
      <option value="">Sort By: Default</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="rating-desc">Top Rated First</option>
    </select>
  );
}

// 4. Main App Component
function App() {
  const [products, setProducts] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryQuery = categories.length > 0 ? categories.join(',') : '';
        const response = await axios.get('http://localhost:3000/api/products', {
          params: {
            category: categoryQuery,
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            minRating: minRating,
            sortBy: sortBy
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [categories, priceRange, minRating, sortBy]);

  const resetFilters = () => {
    setCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setMinRating(0);
    setSortBy('');
  };

  return (
    <div className="app-container">
      <Sidebar 
        categories={categories} setCategories={setCategories}
        priceRange={priceRange} setPriceRange={setPriceRange}
        minRating={minRating} setMinRating={setMinRating}
      />
      
      <div className="main-content">
        <div className="header">
          <h1>Product Catalog</h1>
          <SortMenu sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        
        {products.length === 0 ? (
          <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h2>No items match your criteria.</h2>
            <button onClick={resetFilters} style={{padding: '10px 20px', cursor: 'pointer', background: 'blue', color: 'white', border: 'none', borderRadius: '4px'}}>
              Reset filters
            </button>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}

export default App;