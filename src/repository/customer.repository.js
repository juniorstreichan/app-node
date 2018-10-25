'use strict';

const mongoose = require('mongoose');

const Customer = mongoose.model('Customer');


exports.create = async (data)=>{
    const customer = new Customer(data);
    await customer.save();
}

exports.find = async()=>{
    const result = await Customer.find({});
    return result;
}
