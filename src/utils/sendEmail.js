import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(recipients = "test@gmail.com", subject= "test", text = "test") {
    const transporter = nodemailer.createTransport({
        host: "localhost", 
        port: 465, 
        secure: true,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: recipients.join(", "),
            subject: subject,
            text: text,
        });

        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
