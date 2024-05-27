import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

export default function List() {
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);

    const fetchList = async () => {

        const respone = await axios.get(`${url}/api/food/list`);

        if (respone.data.success) {
            setList(respone.data.data);
        } else {
            toast.error("Error");
        }

    };
    const removeFood = async (foodId) => {
        const respone = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList()
        if (respone.data.success) {
            toast.success(respone.data.message)
        } else {
            toast.error("Error")
        }
    }
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/` + item.image} alt={item.name} width={"200px"} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}$</p>
                        <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
