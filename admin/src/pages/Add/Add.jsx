import React, { useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios";
import { toast } from 'react-toastify';
export default function Add() {
    const url = "http://localhost:4000"
    const [image, setImage] = useState(false)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "salad"

    })
    const onChanehandle = (e) => {

        const name = e.target.name
        const value = e.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandle = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const respone = await axios.post(`${url}/api/food/add`, formData)
        if (respone.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "",

            })
            setImage(false)
            toast.success(respone.data.message)
        } else {
            toast.error(respone.data.message)
        }
    }
    return (
        <div className='add-item'>
            <form className="flex-col" onSubmit={onSubmitHandle}>
                <div className='add-img-upload flex-col'>

                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upl} alt="" width={"200px"} />

                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChanehandle} value={data.name} type="text" name="name" placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChanehandle} value={data.description} rows="6" name="description" placeholder='Type description' />
                </div>

                <div className="add-category-price flex-col">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChanehandle} name="category" id="">

                            <option value="salad">salad</option>
                            <option value="rice">Cơm</option>
                            <option value="pho">Phở</option>
                            <option value="meat">Thịt</option>
                            <option value="vegetable">Rau</option>

                        </select>
                    </div>

                    <div className="add-price">
                        <p>Product Price</p>
                        <input onChange={onChanehandle} value={data.price} type="Number" name="price" placeholder='$0' />
                    </div>
                </div>
                <button type='submit' >Add</button>
            </form>

        </div>
    )
}
