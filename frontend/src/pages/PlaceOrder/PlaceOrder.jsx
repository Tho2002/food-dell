import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../context/StroreContext'
import "./PlaceOrder.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function PlaceOrder() {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    })

    const onchangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(prevData => ({ ...prevData, [name]: value }))
    }

    const PlaceOrder = async (e) => {

        e.preventDefault()
        let orderItems = []

        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2
        }

        try {
            let response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } })
            if (response.data.success) {

                const { session_url } = response.data
                window.location.replace(session_url)
            } else {
                alert("Error: " + response.data.message || "Unable to place order")
            }
        } catch (error) {
            console.error("Error placing order:", error)
            alert("Error placing order: " + error.message)
        }
    }
    const navigate = useNavigate()
    useEffect(() => {

        if (!token) {
            navigate("/cart")
        } else if (getTotalCartAmount() === 0) {
            navigate("/cart")
        }
    }, [token]);
    return (
        <form onSubmit={PlaceOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input required name="firstName" onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name="lastName" onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <input required name="email" onChange={onchangeHandler} value={data.email} type="text" placeholder='Email' />
                <input required name="street" onChange={onchangeHandler} value={data.street} type="text" placeholder='Street' />
                <div className="multi-fields">
                    <input required name="city" onChange={onchangeHandler} value={data.city} type="text" placeholder='City' />
                    <input required name="state" onChange={onchangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name="zipcode" onChange={onchangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
                    <input required name="country" onChange={onchangeHandler} value={data.country} type="text" placeholder='Country' />
                </div>
                <input required name="phone" onChange={onchangeHandler} value={data.phone} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart</h2>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <p>Delivery</p>
                        <p>2$</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>{getTotalCartAmount() + 2}$</b>
                    </div>
                    <button type='submit'>PROCEED TO CHECKOUT</button>
                </div>
            </div>
        </form>
    )
}
