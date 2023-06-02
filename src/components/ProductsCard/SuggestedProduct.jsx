import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { productData } from "../../static/data";
import styles from "../Styles/styles";
import ProductCard from "./ProductCard"; 

const SuggestedProduct = ({ data }) => {
  const {products} = useSelector((state) => state.products);
  const [productData,setProductData] = useState([]);

  useEffect(() => {
    const d =
    products && products.filter((i) => i.category === data.category);
    setProductData(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`p-4`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className={styles.productListContainer}>
             {
                productData && productData.map((i,index) => (
                    <ProductCard data={i} key={index} />
                ))
             }
      </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
