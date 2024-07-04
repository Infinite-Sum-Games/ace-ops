import nodemailer from "nodemailer";
import RegistrationOTPTemplate from "./templates/user_registration";
import { config } from "dotenv";

config({ path: ".env" });

console.log(process.env.MAIL_HOST);

const mailHost = process.env.MAIL_HOST as string;
const mailUser = process.env.EMAIL_ID as string;
const mailPass = process.env.EMAIL_APP_KEY as string;
// To be generalized later
const subjects = {
    registration: "Amrita Centre for Entrepreneurship - Registration: OTP",
    passReset: "Amrita Centre for Entrepreneurship - Password Reset: OTP",
    accountDelete: "Amrita Centre for Entrepreneurship - Account Delete: OTP",
}

const transporter = nodemailer.createTransport({
    service: mailHost,
    auth: {
        user: mailUser,
        pass: mailPass,
    }
});

const sendRegistrationOTP = (username: string, otp: string, email: string) => {
    const mailOptions = {
        from: {
            name: "ACE",
            address: mailUser,
        },
        to: email,
        subject: subjects.registration,
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
