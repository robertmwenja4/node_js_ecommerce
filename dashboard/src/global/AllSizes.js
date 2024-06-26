import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function AllSizes({ value, onChange}){
    const [data, setData] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const BASE_URL = process.env.REACT_APP_APP_URL;
                const response = await axios.get(BASE_URL+"/api/sizes/getAllSizes");
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
            <label>Sizes</label>
            <select className="form-control" value={value} onChange={onChange} name="size_id">
                <option>--Select Size--</option>
                {data.map(item => (
                
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}

export default AllSizes;