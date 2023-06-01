import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Home/Footer";

import Loader from "../components/Loader";
import ProductCard from "../components/ProductsCard/ProductCard";
import styles from "../components/Styles/styles";
import Header from "../components/Header/Header";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { products, isLoading } = useSelector((state) => state.products);
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
  }, [categoryData, products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Header active={3} />
          <div className="pl-2 pr-2 mt-2">
            <div>
              {data && (
                <motion.div className={styles.productListContainer} variants={containerVariants}>
                  {data.map((i, index) => (
                    <motion.div

                      key={index}
                      variants={cardVariants}

                    >
                      <ProductCard data={i} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
            {data && data.length === 0 ? (
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-700 w-full pb-[100px] text-[20px]"
              >
                No products Found 😟
              </motion.h1>
            ) : null}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ProductsPage;
