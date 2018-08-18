"use strict";

const mongoose = require("mongoose");

const Product = mongoose.model("Product");

exports.find = async (labels = "title price slug tags") => {
  const result = await Product.find({ active: true }, labels);
  return result;
};

exports.findBySlug = (slug, labels = "") => {
  return Product.findOne(
    {
      slug: slug,
      active: true
    },
    labels
  );
};

exports.findByTag = (tag, labels = "") => {
  return Product.find(
    {
      tags: tag,
      active: true
    },
    labels
  );
};

exports.findById = (id, labels = "") => {
  return Product.findById(id, labels);
};

exports.crate = data => {
  let product = new Product(data);
  return product.save();
};

exports.update = (id, data) => {
  return Product.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price
    }
  });
};

exports.delete = id => {
  return Product.findByIdAndRemove(id);
};
