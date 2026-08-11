export default function ProductGrid({ products }) {
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