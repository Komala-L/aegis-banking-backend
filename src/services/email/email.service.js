const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify transporter configuration
transporter.verify((error) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Send an email using the configured transporter
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: `"Aegis Banking" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully. Message ID: ${info.messageId}`);

    return info;
  } 
  catch (error) {
    console.error("Failed to send email:", error.message);
    throw error;
  }
};

module.exports = { sendEmail };