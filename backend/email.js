const nodemailer = require("nodemailer");

// you must enable "App Passwords" in your Gmail account!
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",
    pass: "your-app-password" 
  },
});

function sendEmail(to, subject, text) {
  transporter.sendMail(
    {
      from: "Online Tutorial System",
      to,
      subject,
      text,
    },
    (err, info) => {
      if (err) console.log("Email error:", err);
    }
  );
}

module.exports = { sendEmail };
