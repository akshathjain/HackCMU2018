const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'flowfluidproject@gmail.com',
    pass: 'vopdo4-zudrur-wEkqon',
  },
});

function genContent(props, type) {
  const templates = {
    signup: {
      subject: `Welcome to Flow, ${props.username}!`,
      text: 'Now you\'ll get up-to-the-minute water consumptions online.',
    },
  };
  return templates[type];
}

function send(recipient, props, type) {
  transporter.sendMail({
    from: 'flowfluidproject@gmail.com',
    to: recipient,
    ...genContent(props, type),
  }, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = send;
