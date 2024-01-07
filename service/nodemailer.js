const { EMAIL_PASSWORD } = require('../helpers/env');
const nodemailer = require('nodemailer');

const nodemailerConfig = {
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: 'goithw@ukr.net',
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

module.exports = transport;
