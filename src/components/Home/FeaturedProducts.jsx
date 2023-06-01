import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../Styles/styles";
import ProductCard from "../ProductsCard/ProductCard";

const FeaturedProduct = () => {
  const { products } = useSelector((state) => state.products);

  return (
    <div>
      <h2 className={styles.homeTitle}>Featured products</h2>
      <div className={styles.productListContainer}>
        {
          products && products.length !== 0 && (
            <>
              {products && products.map((i, index) => <ProductCard data={i} key={index} />)}
            </>
          )
        }
      </div>
    </div>
  );
};

export default FeaturedProduct;
