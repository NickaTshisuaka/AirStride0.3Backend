import React, { useEffect, useState } from "react";
import "./Products.css";
import Sidebar from "../../components/Sidebar";
import { createApi } from "unsplash-js";

// Use the env variable
const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_KEY,
});

const Products = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("sports equipment");
  const [loading, setLoading] = useState(false);

  const fetchImages = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await unsplash.search.getPhotos({
        query: searchTerm,
        perPage: 12,
      });

      if (response.response) {
        const imgs = response.response.results.map((img) => img.urls.small);
        setImages(imgs);
      } else {
        console.error("Unsplash API error:", response.errors);
        setImages([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(query);
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchImages(query);
    }
  };

  return (
    <div className="products-container">
      <Sidebar />  

      {/* Hero Section */}
      <div className="hero-section products-hero">
        <div className="hero-left">
          <h1>Our Products</h1>
          <p>Quality gear to boost your performance</p>
        </div>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Product Grid */}
      <div className="products-content">
        {loading ? (
          <p>Loading images...</p>
        ) : (
          <div className="product-grid">
            {images.map((img, idx) => (
              <div className="product-card" key={idx}>
                <img src={img} alt={`Product ${idx}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
