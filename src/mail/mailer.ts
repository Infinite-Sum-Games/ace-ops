import nodemailer from "nodemailer";
import RegistrationOTPTemplate from "./templates/user_registration";
import dotenv from "dotenv";

dotenv.config()

console.log(process.env.MAIL_HOST);

// To be generalized later
const subjects = {
    registration: "[Amrita Centre for Entrepreneurship] Registration: OTP",
    passReset: "[Amrita Centre for Entrepreneurship] Password Reset: OTP",
    accountDelete: "[Amrita Centre for Entrepreneurship] Confirm Account Delete: OTP",
}

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_HOST,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_APP_KEY,
    }
});

const sendRegistrationOTP = (username: string, otp: string, email: string) => {
    const mailOptions = {
        from: {
            name: "ACE",
            address: process.env.EMAIL_ADDRESS as string,
        },
        to: email,
        subject: "[Amrita Centre for Entrepreneurship] Registration: OTP",
        html: RegistrationOTPTemplate(username, otp),

    };
    transporter.sendMail(mailOptions, (error, _) => {
        if (error){
            console.log("Could not send OTP\n" + error);
        } else {
            console.log("OTP sent to: " + email);
        }
    });
}

export default sendRegistrationOTP;
