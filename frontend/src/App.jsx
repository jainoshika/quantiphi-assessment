import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import SortMenu from './components/SortMenu';
import './App.css';

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