const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID; //Account SID obtenido de www.twilio.com/console
const authToken = process.env.AUTH_TOKEN; // Auth Token
const client = new twilio(accountSid, authToken);

const twiml = new MessagingResponse();


exports.textMessage = (subject, message, phones) => {
    return client.messages.create({
        body: subject message,
        to: numbers, // Número al que se enviará el SMS
        from: process.env.TWILIO_PHONE_NUMBER // Número comprado de Twilio.com
    })
}

exports.confirmedWorker = () => {
    if (req.body.Body == 'yes') {
        twiml.message('Good');
    } else if (req.body.Body == 'no') {
        twiml.message('Bad');
    } else {
        twiml.message(
            'No Body param match, Twilio sends this in the request to your server.'
        );
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
}