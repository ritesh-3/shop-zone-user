import React from "react";
import styles from "../Styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="text-2xl">Currently NO event is live.. 😟</h2>
      </div>
    );
  } else {
    return (
      <div
        className={`w-full block bg-white rounded-lg ${
          active ? "unset" : "mb-12"
        } lg:flex p-2`}
      >
        <div className="w-[250px] sm:w-[450px] object-contain overflow-hidden m-auto">
          <img src={data?.images[0]} alt="" />
        </div>
        <div className="w-full lg:[w-50%] flex flex-col justify-center ml-8 mt-2">
          <h2 className={`${styles.productTitle}`}>{data?.name}</h2>
          <p>{data.description}</p>
          <div className="flex justify-between">
            <div className="flex">
              <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                ₹ {data.originalPrice}
              </h5>
              <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                ₹ {data.discountPrice}
              </h5>
            </div>
            {/* <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span> */}
          </div>
          <CountDown data={data} />
          <br />
          <div className="flex items-center">
            <Link to={`/product/${data._id}?isEvent=true`}>
              <div className={`${styles.button} text-white`}>See Details</div>
            </Link>
            <div
              className={`${styles.buttonPink} cursor-pointer text-white ml-5`}
              onClick={() => addToCartHandler(data)}
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EventCard;
