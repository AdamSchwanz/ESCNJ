const nodemailer = require('nodemailer');

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Your SMTP host
    port: process.env.EMAIL_PORT, // Your SMTP port (usually 465 or 587 for TLS/STARTTLS)
    secure: true, // Set to true if you're using SSL
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
    }
});

module.exports = transporter;