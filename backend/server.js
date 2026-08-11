const express = require('express');
const cors = require('cors');
const products = require('./data.json'); // Master product inventory array

const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
    // 1. Extract query parameters
    const category = req.query.category; 
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    const minRating = parseInt(req.query.minRating);
    const sortBy = req.query.sortBy;

    // 2. Combinatorial Intersect Filtering & Graceful Null Handling
    let filteredProducts = products.filter(product => {
        // Graceful Null Handling: If undefined/NaN, the filter defaults to true (bypasses)
        let matchesCategory = true;
        if (category) {
            // Supports multiple categories like "Electronics,Apparel"
            const categories = category.split(','); 
            matchesCategory = categories.includes(product.category);
        }

        let matchesMinPrice = true;
        if (!isNaN(minPrice)) {
            matchesMinPrice = product.price >= minPrice;
        }

        let matchesMaxPrice = true;
        if (!isNaN(maxPrice)) {
            matchesMaxPrice = product.price <= maxPrice;
        }

        let matchesRating = true;
        if (!isNaN(minRating)) {
            matchesRating = product.rating >= minRating;
        }

        // Must safely satisfy ALL selected conditions
        return matchesCategory && matchesMinPrice && matchesMaxPrice && matchesRating;
    });

    // 3. The Vibe Check: Sort the filtered array before sending
    if (sortBy) {
        filteredProducts.sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'rating-desc') return b.rating - a.rating;
            return 0;
        });
    }

    // 4. Return the finalized payload
    res.json(filteredProducts);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});