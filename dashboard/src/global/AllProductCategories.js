import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function AllProductCategories({ value, onChange }){
    const [data, setData] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8080/api/categories/getAllCategories");
                // console.log(response);
                setData(response.data)
            } catch (error) {
                console.log(`Error is: ${error}`);
            }
        };
        fetchData()
    },[]);

    return(
        <div className="col-4">
            <label>Product Category</label>
            <select className="form-control" value={value} onChange={onChange} name="category_id">
                <option>--Select Category--</option>
                {data.map(item => (
                
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}

export default AllProductCategories;