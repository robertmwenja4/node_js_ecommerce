const db = require('../models');

const Product = db.products;

//Add product
const addProduct = async (req, res) =>{
    const info = {
        name: req.body.name,
        category_id: req.body.category_id,
        sku: req.body.sku,
        description: req.body.description,
        discount_id: req.body.discount_id
    }
    const product = await Product.create(req.body);
    res.status(201).send(product);
}

//Get all Products
const getAllProducts = async (req,res)=>{
    const products = await Product.findAll({});
    res.status(200).send(products);
}

//Get One Product
const getProduct = async (req, res) => {
    let id = req.params.id;
    const product = await Product.findOne({
        where: {
            id: id
        }
    });
    res.status(200).send(product);
}

//Update Product
const updateProduct = async (req, res) => {
    let id = req.params.id;
    await Product.update(req.body, {
        where: {
            id: id
        }
    });
    res.status(200).send({message: "Product Updated Successfully!!"})
}

//Delete Product
const deleteProduct = (req, res) => {
    let id = req.params.id;
    Product.destroy({
        where: {
            id: id
        }
    }).then((result) => {
        res.status(200).send({message: "Product Deleted Successfully!!"})
    }).catch((err) => {
        console.log(`Error is: ${err}`);
    });
}

module.exports = {
    addProduct, getAllProducts, getProduct,
    updateProduct, deleteProduct
}