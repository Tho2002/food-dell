import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StroreContext'
import FoodItem from '../FoodItem/FoodItem'
export default function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext)
    return (
        <div className='food-display' id="food-display">
            <h2>Top bán chạy nhất</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} description={item.description} />
                    }

                })}
            </div>
        </div>
    )
}
