const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "prof.dev64@gmail.com",
    pass: "adddajyhgwkptevi"
  },
});

module.exports = () => transporter;
