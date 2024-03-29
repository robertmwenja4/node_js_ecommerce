import AllProductCategories from "../../global/AllProductCategories";
import AllDiscounts from "../../global/AllDiscounts";
import AllSizes from "../../global/AllSizes";
import AllColors from "../../global/AllColors";
import { useState } from "react";
import axios from "axios";

function CreateProduct(){

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        category_id: '',
        material: '',
        description: '',
        price: '',
        discount_id: '',
        size_id: '',
        color_id: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // console.log(formData);
            const response = await axios.post("http://127.0.0.1:8080/api/products/addProduct", formData);
            console.log(`Respons from server: ${response.data}`);
            window.location.reload();
        } catch (error) {
            console.log(`Error is: ${error}`);
        }
    };
    
    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    return(
        <div className='card'>
            <div className='card-header'>
                <h1>Add Product</h1>
            </div>
            <div className='card-body'>
               <form onSubmit={handleSubmit}>
               <div className="row form-group">
                    <div className="col-4">
                        <label>Product Name</label>
                        <input className="form-control" name="name" type="text" onChange={handleChange} placeholder="Product Name" />
                    </div>
                    <div className="col-4">
                        <label>SKU</label>
                        <input className="form-control" name="sku" onChange={handleChange}  type="text" placeholder="sku" />
                    </div>
                    <AllProductCategories onChange={handleChange} value={formData.category_id}/>
                </div>
                <div className="row form-group mt-2">
                    <div className="col-4">
                        <label>Description</label>
                        <input className="form-control" type="text" name="description" onChange={handleChange}  placeholder="Description" />
                    </div>
                    <div className="col-4">
                        <label>Material</label>
                        <input className="form-control" name="material" onChange={handleChange} type="text" placeholder="eg Fabric" />
                    </div>
                    <div className="col-4">
                        <label>Price</label>
                        <input className="form-control" name="price" onChange={handleChange}  type="number" placeholder="0.0" />
                    </div>
                </div>
                <div className="row form-group mt-2">
                    <AllDiscounts onChange={handleChange} value={formData.discount_id} />
                    <AllSizes onChange={handleChange} value={formData.size_id} />
                    <AllColors  onChange={handleChange} value={formData.color_id} />
                </div>
                <button type="submit" className="btn btn-lg btn-primary mt-2">Create</button>
               </form>
            </div>
        </div>
    );
}

export default CreateProduct;