import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/slices/ordersSlice";
import { motion, useAnimation } from "framer-motion";
import "./TrackOrder.css"

const TrackOrder = () => {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch]);

    const data = orders && orders.find((item) => item._id === id);

    const checkpoints = [
        { label: "Processing", status: "Processing" },
        { label: "Transferred to Delivery Partner", status: "Transferred to delivery partner" },
        { label: "Shipping", status: "Shipping" },
        { label: "Received", status: "Received" },
        { label: "On the Way", status: "On the way" },
        { label: "Delivered", status: "Delivered" },
        { label: "Processing Refund", status: "Processing refund" },
        { label: "Refund Success", status: "Refund Success" },
    ];

    const getCheckpointIndex = () => {
        return checkpoints.findIndex((checkpoint) => checkpoint.status === data?.status);
    };

    const trackerWidth = `${(getCheckpointIndex() / (checkpoints.length - 1)) * 100}%`;

    const trackerControl = useAnimation();

    useEffect(() => {
        trackerControl.start({ width: trackerWidth });
    }, [trackerControl, trackerWidth]);

    return (
        <div className="tracker-container">
            <div className="tracker-progress" style={{ width: trackerWidth }}></div>
            {checkpoints.map((checkpoint, index) => (
                <div
                    key={index}
                    className={`tracker-checkpoint ${index <= getCheckpointIndex() ? "completed" : ""
                        }`}
                >
                    <span className="checkpoint-label">{checkpoint.label}</span>
                </div>
            ))}
        </div>
    );
};

export default TrackOrder;