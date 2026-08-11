# 🛍️ E-Commerce Product Multi-Filter

A full-stack e-commerce product browsing application built as part of the **Quantiphi Vibe Coding Assessment**.

The application provides an interactive product catalog where users can filter products using multiple criteria simultaneously and sort the resulting products dynamically.

## ✨ Features

### Product Filtering
- Filter products by **Category**
- Filter products using a **Price Range**
- Filter by **Minimum Star Rating**
- Multiple filters work together using intersection-based filtering
- Filters are applied instantly without requiring a submit button

### Product Catalog
- Responsive product card layout
- Product image
- Product name
- Price
- Star rating
- Dynamically updates based on selected filters

### Sorting
Products can be sorted after filtering using:
- **Price: Low to High**
- **Top Rated First**

The application first filters the original inventory and then applies the selected sorting order.

### Empty State
If no products match the selected criteria, the application displays:

> No items match your criteria.

along with an option to reset the filters.

### Reset Filters
Users can quickly clear all active filters and return to the complete product inventory.

---

## 🏗️ Architecture

The application follows a client-server architecture.

```text
┌──────────────────────┐
│      Frontend        │
│                      │
│  Filter Controls     │
│  Product Grid        │
│  Sorting Controls    │
└──────────┬───────────┘
           │
           │ HTTP Requests
           ▼
┌──────────────────────┐
│       Backend        │
│      Node.js         │
│                      │
│  Filtering Logic     │
│  Sorting Logic       │
│  Product API         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   Product Inventory  │
│      Dataset         │
└──────────────────────┘
