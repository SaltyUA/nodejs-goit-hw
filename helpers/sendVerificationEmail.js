const transport = require('../service/nodemailer');
const { BASE_URL } = require('./env');

const sendVerificationEmail = async ({ email, verificationToken }) => {
  const verifyEmail = {
    to: email,
    from: 'goithw@ukr.net',
    subject: 'Verify email',
    html: `<p>Please verify your email with link below</p>
          <a href="${BASE_URL}/users/verify/${verificationToken}" target="_blank">Click verify email</a>`,
  };
  await transport.sendMail(verifyEmail);
};

module.exports = sendVerificationEmail;
