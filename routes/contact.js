const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Save to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Nodemailer - only works if credentials are valid
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.SMTP_USER,
      subject: `New Contact Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log('✅ Email sent & message saved');
    res.status(200).json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('❌ Error in /api/contact:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send message. Check server logs.' });
  }
});

module.exports = router;
