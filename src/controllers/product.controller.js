"use strict";

const ValidationContract = require("./../validators/fluent-validator");

const repo = require("../repository/product.repository");

/**
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
exports.get = async (request, response, next) => {
  try {
    const data = await repo.find();
    response.status(200).send(data);
  } catch (error) {
    response
      .status(error.status | 500)
      .send({
        message: "Erro",
        data: error.message
      });
  }
};

/**
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
exports.getByTag = async (request, response, next) => {
  try {
    const data = await repo.findByTag(request.params.tag);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(error.status)
      .send({
        message: "Erro",
        data: error.message
      });
  }
};

/**
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
exports.getBySlug = async (request, response, next) => {
  try {
    const data = await repo.findBySlug(request.params.slug);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(error.status | 500)
      .send({
        message: "Erro",
        data: error.message
      });
  }
};

/**
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
exports.getById = async (request, response, next) => {
  try {
    const data = await repo.findById(request.params.id);
    response.status(200).send(data);
  } catch (error) {
    response
      .status(error.status | 500)
      .send({
        message: "Erro",
        data: error.message
      });
  }
};

/**
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
exports.post = async (request, response, next) => {
  let contract = validarProduto(request.body);

  if (contract.isInvalid()) {
    response
      .status(400)
      .send(contract.errors())
      .end();
    return;
  }

  return result = await repo.crate(request.body)

  response.status(201).send({
    message: "Cadastrado com sucesso",
    data: result
  });


};

/**
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
exports.put = async (request, response, next) => {
  let contract = validarProduto(request.body);

  if (contract.isInvalid()) {
    response
      .status(400)
      .send(contract.errors())
      .end();
    return;
  }

  repo
    .update(request.params.id, request.body)
    .then(result => {
      response.status(200).send({
        message: "Atualizado com sucesso"
      });
    })
    .catch(err => {
      response.status(400).send({
        message: "Falha na atualização",
        data: err
      });
    });
};

/**
 *
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
exports.delete = async (request, response, next) => {
  repo
    .delete(request.body.id)
    .then(result => {
      response.status(200).send({
        message: "Removido com sucesso"
      });
    })
    .catch(err => {
      response.status(400).send({
        message: "Falha ao remover",
        data: err
      });
    });
};

function validarProduto(body) {
  let contract = new ValidationContract();

  contract.hasMinLen(
    body.title,
    3,
    "title# O titulo deve ter pelo menos 3 caracteres"
  );

  contract.hasMinLen(
    body.description,
    3,
    "description# A descrição deve ter pelo menos 3 caracteres"
  );

  contract.isNegativeOrZero(body.price, "price# O valor deve ser positivo");

  return contract;
}