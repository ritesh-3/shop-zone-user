import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Home/Footer";

import Loader from "../components/Loader"; 
import ProductCard from "../components/ProductsCard/ProductCard"; 
import styles from "../components/Styles/styles";
import Header from "../components/Header/Header";
const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {products,isLoading} = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = products;
      setData(d);
    } else {
      const d =
      products && products.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [products]);

  return (
  <>
  {
    isLoading ? (
      <Loader />
    ) : (
      
      <div>
      <Header active={3} />
      <div className="pl-2 pr-2 mt-2">
        <div className={styles.productListContainer}>
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
    </div>
    )
  }
  </>
  );
};

export default ProductsPage;
