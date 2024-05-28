import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from "../../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { StoreContext } from '../../context/StroreContext'
const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home")
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
    }
    return (
        <div className='navbar'>
            <Link to="/">   <img className="logo" src={assets.logo} /></Link>
            <ul className='navbar-menu'>

                <Link to="/" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                <a href='#app-dowload' onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("Contact")} className={menu === "Contact" ? "active" : ""}>Contact</a>
            </ul>
            <div className='navbar-right'>
                <div className='dot'></div>
                < div className='navbar_icon'>
                    <i className="fa-solid fa-magnifying-glass" ></i>
                    <Link to="/cart">   <div className="cart-container">
                        <i className="cart-icon"><i class="fa-solid fa-cart-shopping"></i></i>
                        <span className={getTotalCartAmount() === 0 ? "" : "cart-dot"}></span>
                    </div></Link>

                </div>
                {!token ? <button onClick={() => setShowLogin(true)} class="btn btn-outline-primary">Sign in</button> :

                    <div className='navbar-profile'>
                        <i class="fa-solid fa-user">User</i>
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate("/myorders")}><i class="fa-solid fa-cart-plus"></i>Order</li>
                            <hr />
                            <li onClick={logout}><i class="fa-solid fa-right-from-bracket"></i>Logout</li>
                        </ul>
                    </div>}
            </div>

        </div >
    )
}

export default Navbar
