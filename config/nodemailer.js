const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: process.env.SGUSER,
        pass: process.env.SGPASSWORD
    }
})

exports.sendEmail = (email, name, msg, password) => {
    return transporter.sendMail({
        from: '"Plain And Fancy Caterers" <contact@gsendgrid.net>',
        to: email,
        subject: 'Welcome to Plain And Fancy',
        html: `<h1>Hello ${name}</h1>
      <p>
      Test
      </p>
      `

    })
}