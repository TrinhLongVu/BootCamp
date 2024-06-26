const _ = require('lodash')
const nodemailer = require("nodemailer");

const getInfoData = ({fields = [], object = {}}) => {
    return _.pick(object, fields)
}

const generateOTP = () => {
  let otp = '';
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp.padStart(6, '0');
};

const sendOTP = (email, OTP) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SERVICE_USER,
    to: email,
    subject: "Your OTP",
    text: `Your OTP is: ${OTP}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { generateOTP, sendOTP, getInfoData };