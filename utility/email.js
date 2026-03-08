// const dotenv = require('dotenv');
// dotenv.config();
const { Resend } = require("resend");
const { AppError, ErrorType } = require("./appError");
const resend = new Resend(process.env.RESEND_API_KEY);

class Email {
    async sendEmail(from, to, subject, body) {
        const { data, error } = await resend.emails.send({
            from,
            to,
            subject,
            html: body,
        });
        if (error)
            throw new AppError(
                `Sending Email Failed: ${error.message}`,
                ErrorType.INTERNAL_ERROR,
                "Utility Email - sendEmail",
            );
        return data;
    }
}

module.exports = new Email();
