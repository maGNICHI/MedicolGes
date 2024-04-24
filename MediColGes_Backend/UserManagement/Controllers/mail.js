 
const nodemailer = require('nodemailer');

const sendVerificationEmail = async ({ user, emailToken }) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook', // Use your email provider
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: 'Verify Your Email',
    html: `<h4>Hello, ${user.username}</h4>
           <p>Please verify your email by entering the following token:</p>
           <p><b>${emailToken}</b></p>
           <p>This token expires in 24 hours.</p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }         
};

module.exports = { sendVerificationEmail };
