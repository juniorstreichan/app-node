'use strict';

const ValidationContract = require('./../validators/fluent-validator');

const repo = require('../repository/order.repository');
const guid = require('guid');

exports.post = async (req, res, next) => {

  try {

    const order = await repo.create({
      number: guid.raw().substring(0, 8).toLocaleUpperCase(),
      customer: req.body.customer,
      items: req.body.items
    });
    res.status(201).send({
      message: 'Pedido cadastrado com sucesso!',
      data: order
    })


  } catch (error) {
    res.status(500).send({
      message: "Falha no processamento"
    });
  }

}

exports.get = async (req, res, next) => {
  try {

    const data = await repo.find();
    res.status(200).send(data);

  } catch (error) {
    res.status(500).send({
      error:error
    });
  }


}
