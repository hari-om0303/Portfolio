const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const submitMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  try {
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // Nodemailer Email Notification (Optional)
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.RECEIVER_EMAIL
    ) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        const mailOptions = {
          from: `"${name}" <${process.env.SMTP_USER}>`,
          to: process.env.RECEIVER_EMAIL,
          replyTo: email,
          subject: `Portfolio Contact Form: ${subject || 'No Subject'}`,
          text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <h3>New Contact Form Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
      } catch (emailErr) {
        console.error('Failed to send email notification:', emailErr.message);
        // We do not crash the response since the message is successfully saved in MongoDB.
      }
    }

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Server error sending message' });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error fetching messages' });
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMsg = await Message.findByIdAndDelete(id);

    if (!deletedMsg) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Server error deleting message' });
  }
};

module.exports = {
  submitMessage,
  getMessages,
  deleteMessage,
};
