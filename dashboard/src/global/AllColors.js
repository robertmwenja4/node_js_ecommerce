import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

function AllColors({ value, onChange}){
    const [data, setData] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const BASE_URL = process.env.REACT_APP_APP_URL;
                const response = await axios.get(BASE_URL+"/api/colors/getAllColors");
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
            <label>Color</label>
            <select className="form-control" value={value} onChange={onChange} name="color_id">
                <option>--Select Color--</option>
                {data.map(item => (
                
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
        </div>
    );
}

export default AllColors;