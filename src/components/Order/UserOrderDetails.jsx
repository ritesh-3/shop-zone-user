import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { getAllOrdersOfUser } from "../../redux/slices/ordersSlice";
import styles from "../Styles/styles";
import "./orderdetails.css";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { server } from "../../ServerConfigs";
import { toast } from "react-toastify";


const ReviewPopup = ({ selectedItem, setOpen, comment, setComment, rating, setRating, reviewHandler }) => {

    return (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
            <div className="w-[98vw] sm:w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
                <div className="w-full flex justify-end p-3">
                    <RxCross1
                        size={30}
                        onClick={() => setOpen(false)}
                        className="cursor-pointer"
                    />
                </div>
                <h2 className="text-[30px] font-[500] font-Poppins text-center">
                    Give a Review
                </h2>
                <br />
                <div className="w-full flex">
                    <img
                        src={selectedItem?.images[0]}
                        alt=""
                        className="w-[80px] h-[80px]"
                    />
                    <div>
                        <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                        <h4 className="pl-3 text-[20px]">
                            ₹{selectedItem?.discountPrice} x {selectedItem?.qty}
                        </h4>
                    </div>
                </div>

                <br />
                <br />

                {/* ratings */}
                <h5 className="pl-3 text-[20px] font-[500]">
                    Give a Rating <span className="text-red-500">*</span>
                </h5>
                <div className="flex w-full ml-2 pt-1">
                    {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                            <AiFillStar
                                key={i}
                                className="mr-1 cursor-pointer"
                                color="rgb(246,186,0)"
                                size={25}
                                onClick={() => setRating(i)}
                            />
                        ) : (
                            <AiOutlineStar
                                key={i}
                                className="mr-1 cursor-pointer"
                                color="rgb(246,186,0)"
                                size={25}
                                onClick={() => setRating(i)}
                            />
                        )
                    )}
                </div>
                <br />
                <div className="w-full ml-3">
                    <label className="block text-[20px] font-[500]">
                        Write a comment
                        <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                            (optional)
                        </span>
                    </label>
                    <textarea
                        name="comment"
                        id=""
                        cols="20"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="How was your product? write your expresion about it!"
                        className="mt-2 w-[95%] border p-2 outline-none"
                    ></textarea>
                </div>
                <div
                    className={`${styles.button} text-white text-[20px] ml-3`}
                    onClick={rating > 1 ? reviewHandler : null}
                >
                    Submit
                </div>
            </div>
        </div>
    )
}


const UserOrderDetails = () => {
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [rating, setRating] = useState(1);

    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user?._id));
    }, [dispatch]);

    const { id } = useParams();
    const data = orders && orders.find((item) => item._id === id);

    const reviewHandler = async (e) => {
        await axios
            .put(
                `${server}/product/create-new-review`,
                {
                    user,
                    rating,
                    comment,
                    productId: selectedItem?._id,
                    orderId: id,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success(res.data.message);
                dispatch(getAllOrdersOfUser(user._id));
                setComment("");
                setRating(null);
                setOpen(false);
            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const refundHandler = async () => {
        await axios.put(`${server}/order/order-refund/${id}`, {
            status: "Processing refund"
        }).then((res) => {
            toast.success(res.data.message);
            dispatch(getAllOrdersOfUser(user._id));
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    };

    const renderOrderItems = () => {
        return (
            data?.cart.map((item, index) => (
                <div className="order-item" key={index}>
                    <div className="item-image">
                        <img src={item.images[0]} alt="" className="image" />
                    </div>
                    <div className="item-details">
                        <h5 className="item-name">{item.name}</h5>
                        <h5 className="item-price">
                            ₹{item.discountPrice} x {item.qty}
                        </h5>
                        {!item.isReviewed && data?.status === "Delivered" && (
                            <div
                                className={`w-[200px] text-white ${styles.button} write-review-button`}
                                onClick={() => setOpen(true) || setSelectedItem(item)}
                            >
                                Write a review
                            </div>
                        )}
                    </div>
                </div>
            ))
        );
    };



    return (
        <div className="order-details shadow-md">
            <div className="order-details-header">
                <h1 className="order-details-title">Order Details</h1>
            </div>

            <div className="order-info">
                <div className="order-info-row">
                    <h5 className="order-info-label">Order ID:</h5>
                    <span className="order-info-value">{data?._id?.slice(0, 8)}</span>
                </div>
                <div className="order-info-row">
                    <h5 className="order-info-label">Placed on:</h5>
                    <span className="order-info-value">
                        {data?.createdAt?.slice(0, 10)}
                    </span>
                </div>
            </div>

            <div className="order-items">
                {renderOrderItems()}
            </div>

            {open && (
                <div className="review-popup">
                    <ReviewPopup reviewHandler={reviewHandler} selectedItem={selectedItem} open={open} setOpen={setOpen} comment={comment} rating={rating} setRating={setRating} setComment={setComment} />
                </div>
            )}

            <div className="total-price">
                <h5 className="total-price-label">Total Price:</h5>
                <strong className="total-price-value">₹{data?.totalPrice}</strong>
            </div>

            <div className="shipping-info">
                <h4 className="shipping-info-title">Shipping Address:</h4>
                <p className="text-gray-400 text-base">{`${data?.shippingAddress?.address1}, ${data?.shippingAddress?.address2}, ${data?.shippingAddress?.city}, ${data?.shippingAddress?.zipCode}, ${data?.shippingAddress?.country}`}</p>
            </div>

            <div className="payment-info">
                <h4 className="payment-info-title">Payment Info:</h4>
                <p className="text-base text-red-300">{data?.paymentInfo?.type}</p>
            </div>

            {
                data?.status === "Delivered" && (
                    <div className={`text-white ${styles.button} `}
                        onClick={refundHandler}
                    >Start Refund</div>
                )
            }
            <div className="send-message-button">
                <Link to={`/user/track/order/${data._id}`}>
                    <div className={`${styles.buttonRed} send-message-button-text`}>
                        Check Status
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UserOrderDetails;
