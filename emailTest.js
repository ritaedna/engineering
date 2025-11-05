const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ritaedna6@gmail.com', // Your Gmail
    pass: 'sqnwbnfpdmquhdgq'         // App Password
  }
});

const mailOptions = {
  from: 'ognordestengineering@gmail.com',
  to: 'ognordestengineering@gmail.com',
  subject: 'Test Email from Node',

  text: 'This is a test email from your Node.js server'
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("Error sending email:", err);
  } else {
    console.log("Email sent successfully!", info.response);
  }
});
