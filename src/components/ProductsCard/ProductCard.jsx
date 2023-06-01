import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
// import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { useEffect } from "react";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
import styles from "../Styles/styles";




const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
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




  return (

    <div className="w-full h-[200px] sm:h-[250px] rounded shadow-lg p-3 relative cursor-pointer  overflow-hidden group">
      <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
        <img
          src={data.images && data.images[0]}
          alt=""
          className="w-full h-[100px] sm:h-[150px] object-contain rounded-t-lg"
        />
      </Link>
      <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
        <h4 className="pb-1 font-semibold text-md sm:text-lg truncate">{data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}</h4>


        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice} text-black text-md sm:text-lg font-semibold mr-2`}>
              ₹ {data.originalPrice === 0 ? data.originalPrice : data.discountPrice}
            </h5>
            {data.originalPrice && (
              <h4 className={`${styles.price} text-gray-500 line-through`}>₹{data.originalPrice}</h4>
            )}
          </div>
          <span className="font-normal text-sm text-[#68d284]">{data?.sold_out} sold</span>
        </div>
      </Link>

      {/* Side buttons */}
      <div className="absolute right-0 p-2 sm:p-3 top-0 justify-between">
        {click ? (
          <AiFillHeart
            size={18}
            className="cursor-pointer mt-2"
            onClick={() => removeFromWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={18}
            className="cursor-pointer  mt-2"
            onClick={() => addToWishlistHandler(data)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        {/* <AiOutlineEye
          size={18}
          className="cursor-pointer  mt-2"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        /> */}
        <AiOutlineShoppingCart
          size={18}
          className="cursor-pointer  mt-2"
          onClick={() => addToCartHandler(data._id)}
          color="#444"
          title="Add to cart"
        />
      </div>

      {/* Quick view */}
      {/* {open && <ProductDetailsCard setOpen={setOpen} data={data} />} */}
    </div>




  );
};

export default ProductCard;
