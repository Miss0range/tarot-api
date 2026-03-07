const {Resend} = require('resend');
const dotenv = require('dotenv');
dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

class Email{
    async sendEmail(from, to, subject, body) {
        return await resend.emails.send({
            from,
            to,
            subject,
            html: body
        });
    }
}

module.exports = new Email();