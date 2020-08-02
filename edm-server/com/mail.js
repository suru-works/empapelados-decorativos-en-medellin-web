const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function mail(options) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: options.serverService,
    auth: {
      user: options.serverMail, // generated ethereal user
      pass: options.serverPassword, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: options.sender, // sender address
    to: options.receivers, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
    html: options.html, // html body
  },
  function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.mail = mail;