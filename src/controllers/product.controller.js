"use strict";

const mongoose = require("mongoose");

const Product = mongoose.model("Product");

exports.get = (request, response, next) => {
  Product.find({ active: true }, "title price slug tags")
    .then(result => {
      response.status(200).send(result);
    })
    .catch(err => {
      response.status(400).send({ message: "Erro", data: err });
    });
};

exports.getByTag = (request, response, next) => {
  Product.find(
    {
      tags: request.params.tag,
      active: true
    },
    "title price slug tags"
  )
    .then(result => {
      response.status(200).send(result);
    })
    .catch(err => {
      response.status(400).send({ message: "Erro", data: err });
    });
};

exports.getBySlug = (request, response, next) => {
  Product.findOne(
    {
      slug: request.params.slug,
      active: true
    },
    "title description price slug tags"
  )
    .then(result => {
      response.status(200).send(result);
    })
    .catch(err => {
      response.status(400).send({ message: "Erro", data: err });
    });
};
exports.getById = (request, response, next) => {
  Product.findById(request.params.id)
    .then(result => {
      response.status(200).send(result);
    })
    .catch(err => {
      response.status(400).send({ message: "Erro", data: err });
    });
};
exports.post = (request, response, next) => {
  let product = new Product(request.body);
  product
    .save()
    .then(result => {
      response
        .status(201)
        .send({ message: "Cadastrado com sucesso", data: product });
    })
    .catch(err => {
      response.status(400).send({ message: "Falha no cadastro", data: err });
    });
};

exports.put = (request, response, next) => {
  Product.findByIdAndUpdate(request.params.id, {
    $set: {
      title: request.body.title,
      description: request.body.description,
      price: request.body.price
    }
  })
    .then(result => {
      response.status(200).send({
        message: "Atualizado com sucesso"
      });
    })
    .catch(err => {
      response.status(400).send({ message: "Falha na atualização", data: err });
    });
};

exports.delete = (request, response, next) => {
  let id = request.params.id;
  response.status(200).send({
    id: id,
    status: "deleted"
  });
};
