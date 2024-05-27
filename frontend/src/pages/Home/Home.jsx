import React, { useState } from 'react'
import Header from "../../components/Header/Header"
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDowload from '../../components/AppDowload/AppDowload'
export default function Home() {
    const [category, setCategory] = useState("All")
    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <AppDowload />
        </div>
    )
}
