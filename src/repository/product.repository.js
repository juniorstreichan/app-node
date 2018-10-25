'use strict';

const mongoose = require('mongoose');

const Product = mongoose.model('Product');

exports.find = async (labels = 'title price slug tags') => {
  const result = await Product.find({
    active: true
  }, labels);
  return result;
};


exports.findBySlug = async (slug, labels = '') => {
  const result = await Product.findOne({
      slug: slug,
      active: true
    },
    labels
  );
  return result;
};



exports.findByTag = async (tag, labels = '') => {
  const result = Product.find({
      tags: tag,
      active: true
    },
    labels
  );
  return result;
};

exports.findById = async (id, labels = '') => {
  const result = await Product.findById(id, labels);
  return result;
};

exports.create = async data => {
  let product = new Product(data);
  const result = await product.save();
  return result;
};

exports.update = async (id, data) => {
  await Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price
    }
  });
};

exports.delete = async id => {
  await Product.findByIdAndRemove(id);
};