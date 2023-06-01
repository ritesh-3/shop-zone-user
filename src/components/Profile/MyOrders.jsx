import React, { useEffect, useState } from 'react'
import ResponsiveTable from '../DynamicTable/DynamicTable'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersOfUser } from '../../redux/slices/ordersSlice'
import { useNavigate } from 'react-router-dom'

const MyOrders = () => {
    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllOrdersOfUser(user?._id));
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(
            orders
                .map(({ _id, cart,createdAt, totalPrice, status }) => ({
                    _id,
                    quantity: cart.length,
                    totalPrice,
                    status,
                    createdAt
                }))
                .sort((a, b) => a.createdAt.localeCompare(b.createdAt)) // Sort filteredData based on name
        );
    }, [orders]);


    const headers = [
        { title: "Order Id", value: '_id' },
        { title: "Status", value: 'status' },
        { title: "Total Price", value: 'totalPrice' },
        { title: "Quantity", value: 'quantity' },
        { title: "Actions", value: "actions", actions: ["view"] }
    ]



    const hanldeViewEvent = (res) => {
        if (res) navigate(`/user/order/${res._id}`)
    }

    // const handleTrackOrder = (res) => {
    //     if (res) navigate(`/user/track/order/${res._id}`)
    // }

    return (

        <div className='m-2'>
            <ResponsiveTable key={filteredData.length} tableData={filteredData} headers={headers} onViewAction={hanldeViewEvent} />
        </div>
    )
}

export default MyOrders
