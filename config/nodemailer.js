const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = (email, name, password, pinCode) => {
    const msg = {
        to: email,
        from: 'plainfancyapp@gmail.com',
        subject: 'Welcome to Plain And Fancy',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<h1>Hello ${name} here is password ${password} and you pinCode is ${pinCode}</h1>
      <p>
      Test
      </p>
      `,
    }

    sgMail.send(msg).then(() => {
        console.log('Email sent')
    }).catch((error) => {
        console.error(error)
    })
}
