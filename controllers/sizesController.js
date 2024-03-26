const db = require('../models');

const Size = db.sizes;

//Create sizes
const addsize = async (req, res) => {
    const info = {
        name: req.body.name,
        short_name: req.body.short_name
    };

    const size = await Size.create(info);
    res.status(201).send(size);
}
//Get All sizes
const getAllsizes = async (req, res) => {
    const sizes = await Size.findAll({});
    res.send(sizes);
}

//Get one size
const getOnesize = async(req, res) => {
    const id = req.params.id;
    const size = await Size.findOne({
        where: {
            id: id
        }
    });
    res.send(size);
}

//Update size
const updatesize = async(req, res) => {
    const id = req.params.id;
    await Size.update(req.body, {
        where: {
            id: id
        }
    });
    res.status(200).send({
        message: "Size Updated Successfully!!"
    });
}

//Delete size
const deletesize = async(req, res) => {
    const id = req.params.id;
    await Size.destroy({
        where: {
            id: id
        }
    });
    res.send({
        message: "Size Deleted Successfully"
    });
}

module.exports = {
    addsize, getAllsizes, getOnesize, updatesize, deletesize
}