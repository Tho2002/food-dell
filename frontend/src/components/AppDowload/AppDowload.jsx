import React from 'react'
import { assets } from '../../assets/assets'
import "./AppDowload.css"
export default function AppDowload() {
    return (
        <div className='app-dowload'>
            <p>For Better Experience Dowload</p>
            <br />
            <div className="app-dowload-platforms">
                <img src={assets.ggplay} alt="" width={"300px"} />
                <img src={assets.appstore1} width={"400px"} />
            </div>

        </div>
    )
}
