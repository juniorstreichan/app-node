'use strict';

const config = require('../../config')
var sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(config.sendgridKey);

exports.send = async (to, subject, body) => {
  sendgrid.send({
    to: to,
    from: 'juniorstreichan@sisteminha.com',
    subject: subject,
    html: body
  })
}
