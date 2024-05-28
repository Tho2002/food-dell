import React, { useContext, useState, useEffect } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StroreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

export default function MyOrders() {
    const [data, setData] = useState([])
    const { url, token } = useContext(StoreContext)
    const fetchOrder = async () => {
        const response = await axios.post(url + "/api/order/userorder", {}, { headers: { token } })
        setData(response.data.data)
        console.log(response.data.data);
    }
    useEffect(() => {

        if (token) {
            fetchOrder()
        }
    }, [token]);
    return (
        <div className='my-orders'>
            <h2>My Order</h2>
            <div className='container'>
                {data.map((order, index) => {
                    return (<div key={index} className='my-orders-order'>

                        <img src={assets.box} alt="" />
                        <p>{order.items.map((item, index) => {
                            if (index === order.items.length - 1) {
                                return item.name + "x" + item.quantity + ","
                            }
                        })}</p>
                        <p>{order.amount}$</p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span>{order.status}</p>
                        <button>Track Order</button>
                    </div>)
                })}
            </div>
        </div>
    )
}
