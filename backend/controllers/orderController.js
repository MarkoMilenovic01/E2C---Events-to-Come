import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrder = asyncHandler(async (req, res) => {
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice} = req.body;
    if(orderItems && orderItems.length == 0){
        res.status(400);
        throw new Error("No order items");
    }else{
        const order = new Order({
            orderItems: orderItems.map((x) => ({
                ...x, 
                event: x._id,
                _id: undefined
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc Get logged in user orders
// @route GET /api/orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if(order){
        res.status(200).json(order);
    }else{
        res.status(404);
        throw new Order("Order not found");
    }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("Update order to paid");
});


// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("Update order to delivered");
});

// @desc Get all orders
// @route GET /api/orders/:id/pay
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    res.send("Get all orders");
});


export {
    addOrder,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid,
    getOrders
}



