const db = require('../models');
const Discount = db.discounts;

//add discount
const addDiscount = async(req, res) => {
    const info = {
        name: req.body.name,
        description: req.body.description,
        discount_percent: req.body.discount_percent,
        status: req.body.status
    };
    const discount = await Discount.create(info);
    res.status(201).send(discount);
}

//Get All Discounts
const getAllDiscounts = async (req, res) => {
    const discounts = await Discount.findAll({});
    res.send(discounts);
}

//Get one Discount
const getOneDiscount = async(req, res) => {
    const id = req.params.id;
    const discount = await Discount.findOne({
        where: {
            id: id
        }
    });
    res.send(discount);
}

//Update Discount
const updateDiscount = async(req, res) => {
    const id = req.params.id;
    const discount = await Discount.update(req.body, {
        where: {
            id: id
        }
    });
    res.status(200).send({
        message: "Discount Updated Successfully!!"
    });
}

//Delete Discount
const deleteDiscount = async(req, res) => {
    const id = req.params.id;
    await Discount.destroy({
        where: {
            id: id
        }
    });
    res.send({
        message: "Discount Deleted Successfully"
    });
}
//Discounts where ctive
const activeDiscounts = async(req, res) => {
    try {
        const discounts = await Discount.findAll({
            where: {
                status: 'active'
            }
        })
        res.send(discounts);
    } catch (error) {
        console.log(`Error is: ${error}`);
    }
}

module.exports = {
    addDiscount, getAllDiscounts, getOneDiscount, updateDiscount, deleteDiscount,activeDiscounts
}