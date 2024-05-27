import React from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-options">
                <NavLink to="/add" className="sidebar-option">
                    <img src={assets.add} alt="" className='add' width={"60px"} />
                    <p>Add Item</p>
                </NavLink>
                <NavLink to="list" className="sidebar-option">
                    <img src={assets.list} alt="" className='add' width={"60px"} />
                    <p>List Item</p>
                </NavLink>
                <NavLink to="order" className="sidebar-option">
                    <img src={assets.percel} alt="" className='add' width={"60px"} />
                    <p>Order Item</p>
                </NavLink>
            </div>
        </div>
    )
}
