const db = require('../models');

const Category = db.categories;

//Create Categorys
const addCategory = (req, res) => {
    const info = {
        name: req.body.name,
        description: req.body.description
    };

    Category.create(info)
    .then(result=> {
        res.status(201).send(result);
    }).catch(err=>{
        res.send({error: `The error is: ${err}`})
    })
}
//Get All Categorys
const getAllCategorys = async (req, res) => {
    const categories = await Category.findAll({});
    res.send(categories);
}

//Get one Category
const getOneCategory = (req, res) => {
    const id = req.params.id;
    Category.findOne({
        where: {
            id: id
        }
    })
    .then(result=> {
        res.status(200).send(result);
    }).catch(err=>{
        res.send({error: `The error is: ${err}`})
    });
}

//Update Category
const updateCategory = (req, res) => {
    const id = req.params.id;
    Category.update(req.body, {
        where: {
            id: id
        }
    }).then(result=> {
        res.status(200).send({
            message: "Category Updated Successfully!!"
        });
    }).catch(err=>{
        res.send({error: `The error is: ${err}`})
    });
   
}

//Delete Category
const deleteCategory = (req, res) => {
    const id = req.params.id;
    Category.destroy({
        where: {
            id: id
        }
    })
    .then((result)=> {
        
        if(result == 0){
            res.status(200).send({
                message: "Category Already Deleted!!"
            });
        }
        res.status(200).send({
            message: "Category Deleted Successfully!!"
        });
    }).catch(err=>{
        res.send({error: `The error is: ${err}`})
    });
}

module.exports = {
    addCategory, getAllCategorys, getOneCategory, updateCategory, deleteCategory
}