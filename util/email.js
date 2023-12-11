const nodemailer = require('nodemailer');
const EventEmitter = require('events');

const emailEventEmitter = new EventEmitter();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name.split(' ')[0];
    this.url = url;
    this.from = 'hospital Team <ahmed@hospital.io>';
  }

  // Send an email with specified subject and message
  async send(subject, message, html) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: message || '',
      html
    };

    // Emit the 'sendEmail' event with mailOptions
    emailEventEmitter.emit('sendEmail', mailOptions);
  }

  async sendWelcomeEmail() {
    const subject = 'Welcome to Cafe ☕️';
    const message = `Hello ${this.name}! 🎉
  
    Welcome to Cafe! We're delighted to have you as part of our community. Savor the rich aroma of our freshly brewed coffee, indulge in our delectable treats, and make every moment memorable in our cozy ambiance. 
  
    Whether you're here for a quick coffee break or planning to spend a relaxing afternoon, we aim to provide an exceptional experience.
  
    Feel free to explore our menu and discover the flavors that suit your taste. Our team is here to ensure you have a delightful time at Cafe.
  
    Cheers,
    The Cafe Team ☕️`;

    await this.send(subject, null, message);
  }

  async sendPasswordResetEmail(html) {
    const subject = "Password Reset Request for Your Cafe Account 🛡️"
    const message = 'hi'
    await this.send(subject, message, html);
  }
};

emailEventEmitter.on('sendEmail', async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASS_KEY,
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
});
