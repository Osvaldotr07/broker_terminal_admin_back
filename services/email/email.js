const nodemailer = require("nodemailer");

const main = async (email, title, description) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 2525,
    secure: false,
    ignoreTLS: true,
    auth: {
        user: 'gars2020it@gmail.com',
        pass: '37B3fEd2QpGawSk' 
      }
  });

  try {
    let info = await transporter.sendMail({
      from: "broker@ibm.com",
      to: `${email}`,
      subject: `${title}`,
      text: `${description}`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

module.exports = main;
