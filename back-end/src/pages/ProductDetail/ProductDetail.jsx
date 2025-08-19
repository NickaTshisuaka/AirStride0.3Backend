import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import "./ProductDetail.css";

// Mock data for now
const mockProducts = [
  {
    id: "1",
    name: "Breathing Trainer",
    price: "$49.99",
    description:
      "Enhance your lung capacity and endurance with this professional breathing trainer.",
    images: [
      "https://picsum.photos/400/400?random=1",
      "https://picsum.photos/400/400?random=11",
      "https://picsum.photos/400/400?random=12",
    ],
  },
  {
    id: "2",
    name: "Jogging Shoes",
    price: "$89.99",
    description: "Comfortable, lightweight shoes designed for optimal performance.",
    images: [
      "https://picsum.photos/400/400?random=2",
      "https://picsum.photos/400/400?random=21",
      "https://picsum.photos/400/400?random=22",
    ],
  },
];

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const selected = mockProducts.find((p) => p.id === productId);
    if (selected) {
      setProduct(selected);
      setMainImage(selected.images[0]);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="product-detail-container">
        <Sidebar />
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <Sidebar />

      <div className="product-detail-content">
        {/* Main Image */}
        <div className="product-image">
          <img src={mainImage} alt={product.name} />
          {/* Thumbnail Carousel */}
          <div className="thumbnail-carousel">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className={img === mainImage ? "active-thumb" : ""}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <h2 className="product-price">{product.price}</h2>
          <p>{product.description}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
