import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify"
import "./Order.css"
import axios from "axios"
import { assets } from '../../assets/assets'
export default function Order() {
    const url = "http://localhost:4000"
    const [orders, setOrders] = useState([])
    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list")
        if (response.data.success) {
            setOrders(response.data.data)
            console.log(response.data.data);
        } else {
            toast.error("Error")
        }
    }
    const statusHandle = async (e, orderId) => {
        const response = await axios.post(url + "/api/order/status", { orderId, status: e.target.value })
        if (response.data.success) {
            await fetchAllOrders()
        }
    }
    useEffect(() => {
        fetchAllOrders()
    }, []);
    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className='order-list'>
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img width={"50px"} src={assets.box} alt="" />
                        <div>{order.items.map((item, index) => {
                            if (index === order.items.length - 1) {
                                return item.name + "x" + item.quantity
                            } else {
                                return item.name + "x" + item.quantity + ","
                            }
                        })}

                            <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street}</p>
                                <p>{order.address.city + "," + order.address.country + ", " + order.address.state + " ," + order.address.zipcode}</p>
                                <p className='order-item-phone'> {order.address.phone}</p>
                            </div>
                        </div>

                        <p>Items :{order.items.length}</p>
                        <p>{order.amount}$</p>
                        <select onChange={(e) => statusHandle(e, order._id)} value={order.status} name="" id="">
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}

            </div>
        </div>
    )
}
