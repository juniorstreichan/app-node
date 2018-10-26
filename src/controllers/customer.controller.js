'use strict';

const ValidationContract = require('./../validators/fluent-validator');
const repo = require('../repository/customer.repository');
const md5 = require('md5');

const emailService = require('../services/email-service')

exports.post = async (request, response, next) => {
  let contract = validCustomer(request.body);

  if (contract.isInvalid()) {
    response
      .status(400)
      .send(contract.errors())
      .end();
    return;
  }

  const result = await repo.create({
    name: request.body.name,
    email: request.body.email,
    password: md5(request.body.password + global.SALT_KEY)
  })

  if (result !== null) {

     console.log(request.body.name,
     request.body.email);

    emailService.send(
      request.body.email,
      'Bem vindo ao sisteminha',
      global.EMAIL_TMPL.replace('{0}', `Bem vindo ao sisteminha, ${request.body.name} !!`)
    )

    response.status(201).send({
      message: 'Cadastrado com sucesso',
      data: result
    });
  } else {
    response.status(404).send(null);
  }


};

exports.get = async (request, response, next) => {

  try {
    const data = await repo.find();
    response.status(200).send(data);
  } catch (error) {
    response.status(500).send({
      error: error
    })
  }
}

function validCustomer(body) {
  let contract = new ValidationContract();

  contract.hasMinLen(
    body.name,
    3,
    'name# O Nome deve ter pelo menos 3 caracteres'
  );

  contract.isEmail(
    body.email,
    'email# Email inválido'
  );

  contract.hasMinLen(body.password, 6, 'password# A senha deve ter pelo menos 6 caracteres');

  return contract;
}
