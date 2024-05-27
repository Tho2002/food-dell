import React, { useContext } from 'react'
import "./FoodItem.css"
import { assets } from "../../assets/assets"
import { StoreContext } from '../../context/StroreContext'
export default function FoodItem({ id, name, price, description, image }) {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)
    return (
        <div className='food-item' >
            <div className='food-item-img-container'>

                <img className='food-item-image' src={url + "/images/" + image} />
                {!cartItems[id] ? <img onClick={() => addToCart(id)} className='add' src={assets.sum} width={"50px"} /> : <div className='food-item-counter'>

                    <img onClick={() => addToCart(id)} width={"30px"} src={assets.up} />
                    <p>{cartItems[id]}</p>
                    <img onClick={() => removeFromCart(id)} width={"30px"} src={assets.down} />
                </div>}

            </div>
            <div className='food-item-info'>

                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.star} width={"100px"} />
                </div>
                <p className='food-item-description'>{description}</p>
                <p className='food-item-price'>{price}$</p>
            </div>
        </div>
    )
}
