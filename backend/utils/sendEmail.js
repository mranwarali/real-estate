const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: options.from || '"My Awesome App" <noreply@yourapp.com>',
    to: options.to || options.email,
    subject: options.subject,
    html: options.html,
  });
};

module.exports = sendEmail;
