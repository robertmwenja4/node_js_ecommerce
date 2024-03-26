const db = require('../models');

const Color = db.colors;

//Create Colors
const addColor = async (req, res) => {
    const info = {
        name: req.body.name,
        hex_pattern: req.body.hex_pattern
    };

    const color = await Color.create(info);
    res.status(201).send(color);
}
//Get All Colors
const getAllColors = async (req, res) => {
    const colors = await Color.findAll({});
    res.send(colors);
}

//Get one color
const getOneColor = async(req, res) => {
    const id = req.params.id;
    const color = await Color.findOne({
        where: {
            id: id
        }
    });
    res.send(color);
}

//Update Color
const updateColor = async(req, res) => {
    const id = req.params.id;
    await Color.update(req.body, {
        where: {
            id: id
        }
    });
    res.status(200).send({
        message: "Color Updated Successfully!!"
    });
}

//Delete Color
const deleteColor = async(req, res) => {
    const id = req.params.id;
    await Color.destroy({
        where: {
            id: id
        }
    });
    res.send({
        message: "Color Deleted Successfully"
    });
}

module.exports = {
    addColor, getAllColors, getOneColor, updateColor, deleteColor
}