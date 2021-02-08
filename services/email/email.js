const nodemailer = require('nodemailer')

const main = async (email, title, description) => {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    })

    let info = await transporter.sendMail({
        from: 'broker@ibm.com',
        to: `${email}`,
        Subject: `${title}`,
        text: `${description}`,
    })
}

module.exports = main