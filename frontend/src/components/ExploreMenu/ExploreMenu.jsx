import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from "../../assets/assets"
export default function ExploreMenu({ category, setCategory }) {
    return (
        <div className='explore-menu' id="explore-menu">
            <h1>Explore Menu</h1>
            <p className='explore-menu-text'>Tổng hợp tất tần tật những món ngon mỗi ngày dễ làm giúp bạn không phải bò đầu bứt tai suy nghĩ xem hôm nay ăn gì.</p>
            <div className='explore-menu-list'>

                {menu_list.map((item, index) => {

                    return (
                        <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}
