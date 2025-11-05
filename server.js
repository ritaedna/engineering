// -------------------- IMPORTS --------------------
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

// -------------------- APP SETUP --------------------
const app = express();
const PORT = process.env.PORT || 3000;

// ------------------ MONGODB CONNECTION ------------------
mongoose.connect(
  "mongodb+srv://ritaedna6_db_user:is3PxQyLbZLZKxy9@cluster0.cnldtwg.mongodb.net/ognordest?retryWrites=true&w=majority", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ------------------ CONTACT SCHEMA ------------------
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const ContactMessage = mongoose.model("ContactMessage", contactSchema);

// ------------------ MIDDLEWARE ------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// ------------------ NODEMAILER SETUP ------------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ritaedna6@gmail.com',      // Your Gmail
    pass: 'sqnwbnfpdmquhdgq'          // Your Gmail App Password
  }
});

// ------------------ CONTACT ROUTE ------------------
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const newMessage = new ContactMessage({ name, email, subject, message });

  try {
    // Save message to MongoDB
    await newMessage.save();
    console.log("✅ Message saved to MongoDB:", newMessage);

    // Send email notification
    const mailOptions = {
      from: email,
      to: 'ognordestengineering@gmail.com',   // Recipient email
      subject: `New message from ${name}: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent successfully");

    return res.json({ status: 'success', message: 'Message sent and saved successfully!' });

  } catch (err) {
    console.error("❌ Error:", err);
    return res.json({ status: 'error', message: 'Failed to send message.' });
  }
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
