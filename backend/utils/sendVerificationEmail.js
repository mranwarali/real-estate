const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 465,
      // secure: true,
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const url = `http://localhost:5173/verify-email/${token}`;

    const info = await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `
        <h3>Welcome!</h3>
        <p>Please click the link below to verify your account:</p>
        <a href="${url}" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Verify Email</a>
      `,
    });

    console.log("Email sent successfully: %s", info.messageId);
  } catch (error) {
    console.error("Nodemailer Error Trace:", error);
  }
};

module.exports = sendVerificationEmail;
