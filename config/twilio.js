var twilio = require('twilio');
var accountSid = process.env.TWILIO_ACCOUNT_SID; //Account SID obtenido de www.twilio.com/console
var authToken = process.env.AUTH_TOKEN; // Auth Token
var client = new twilio(accountSid, authToken);


exports.textMessage = (message, phones) => {
    return client.messages.create({
        body: message,
        to: numbers, // Número al que se enviará el SMS
        from: process.env.TWILIO_PHONE_NUMBER // Número comprado de Twilio.com
    })
}