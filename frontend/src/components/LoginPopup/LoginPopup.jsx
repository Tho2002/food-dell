import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import "./LoginPopup.css"
import { StoreContext } from '../../context/StroreContext'
import axios from "axios"
export default function LoginPopup({ setShowLogin }) {
    const { url, setToken } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign up")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChangeHandle = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    useEffect(() => {
        console.log(data);

    }, [data]);
    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data)
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            setShowLogin(false)
        } else {
            alert(response.data.message)
        }
    }
    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross} width={"20px"} />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandle} value={data.name} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangeHandle} value={data.email} type="email" placeholder='Your email' required />
                    <input name="password" onChange={onChangeHandle} value={data.password} type="password" placeholder=' password' required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing,i agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account ?<span onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <p>Already have an accounts?<span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>

        </div>
    )
}
