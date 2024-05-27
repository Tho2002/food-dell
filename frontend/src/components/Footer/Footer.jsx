import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
export default function Footer() {
    return (
        <div className='footer' id="footer">
            <div className='footer-content'>

                <div className="footer-content-left">
                    <img src={assets.logo} width={"200px"} />
                    <p>From small bites to big meals, we won't limit your appetite. Go ahead and order all you want.</p>
                    <div className="footer-social-icons">
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-youtube"></i>
                        <i class="fa-brands fa-instagram"></i>
                    </div>
                </div>

                <div className="footer-content-center">

                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">

                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+84 789007712</li>
                        <li>contact@ldtho1604@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-coppyright'>Copyright 2024 @ Restaurant _All right</p>
        </div>
    )
}
