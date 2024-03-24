const db = require('../models')

const Order = db.orders;
const OrderItem = db.order_items;



// Create order
const createOrder = async(req, res) => {
    const info = {
        user_id: req.body.user_id,
        total_price: req.body.total_price
    };

    const order = await Order.create(info);
    // console.log(order['id']);
    const items = req.body.items;
    items.map((item)=>{
        item['order_id'] = order['id'];
        OrderItem.create(item)
        .then(result=> console.log("Created"))
        .catch(err=> console.log(`Error is: ${err}`))
        // console.log(item, order['id']);
    })
    
    
    res.status(201).send(order);
}

//Get arders created by this user
const ordersByCustomer = async (req, res) => {
    const user_id = req.user._id;
    const orders = await Order.findAll({
        where:{
            ueer_id: user_id
        }
    })
    res.status(200).send(orders);
}

//get all orders
const getAllOrders = async(req,res) => {
    const orders = await Order.findAll({});
    res.status(200).send(orders);
}

//get one order
const getOneOrder = async(req,res) => {
    const id = req.params.id;
    const order = await Order.findOne({
        include: [
            {
                model: OrderItem,
                as: 'order_items'
            }
        ],
        where: {
            id: id
        }
    });
    res.status(200).send(order);
}

//update
const updateOrder = (req, res) => {
    const id = req.params.id;
    Order.update(req.body, {
        where: {
            id: id
        }
    }).then((result) => {
        res.send({message: "Order Updated Successfully"})
    }).catch((err) => {
        console.log(`Error is: ${err}`);
        
    });
}

//Delete order
const deleteOrder = async(req, res) => {
    const id = req.params.id;
    await Order.destroy({
        where:{
            id: id
        }
    });
    res.send({message: "Order Deleted Successfully"})
}

module.exports = {
    createOrder, getAllOrders, getOneOrder, updateOrder, deleteOrder, ordersByCustomer
}