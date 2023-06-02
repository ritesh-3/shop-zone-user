import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../Styles/styles";
import ProductCard from "../ProductsCard/ProductCard";

const FeaturedProduct = () => {
  const { products } = useSelector((state) => state.products);

  // Filter the products array to show only six products
  const featuredProducts = products.slice(0, 10);

  return (
    <div>
      <h2 className={styles.homeTitle}>Featured products</h2>
      <div className={styles.productListContainer}>
        {featuredProducts && featuredProducts.length !== 0 ? (
          featuredProducts.map((i, index) => <ProductCard data={i} key={index} />)
        ) : (
          <p>No featured products available.</p>
        )}
      </div>
    </div>
  );
};


export default FeaturedProduct;
