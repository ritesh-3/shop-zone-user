import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Home/Footer";
import Header from "../components/Header/Header";
import ProductDetails from "../components/ProductsCard/ProductDetails";
import SuggestedProduct from "../components/ProductsCard/SuggestedProduct";
import { useSelector } from "react-redux";
import styles from "../components/Styles/styles";

const ProductDetailsPage = () => {
  const { products } = useSelector((state) => state.products);
  const { events } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = events && events.find((i) => i._id === id);
      setData(data);
    } else {
      const data = products && products.find((i) => i._id === id);
      setData(data);
    }
  }, [products, events]);

  return (
    <div>
      <Header />
      <div className={styles.innerPading}>
        <ProductDetails data={data} />
        {
          !eventData && (
            <>
              {data && <SuggestedProduct data={data} />}
            </>
          )
        }
       
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
