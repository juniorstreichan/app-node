'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.find = async ()=>{
    const orders = await Order.find({})
         .populate('customer', 'name')
         .populate('items.product','title');
    return orders
}

exports.create = async (data)=>{
    const order = new Order(data);
    await order.save();
}
