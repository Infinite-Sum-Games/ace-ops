export const RegistrationOTPTemplate = (username: string, otp: string) => {
  return (
    `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amrita Centre for Entrepreneurship - Registration OTP</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    </style>
</head>

<body>
    <p>Dear ${username},</p>
    <br />
    <p>
        Thank you for registering with Amrita Centre for Entrepreneurship. 
        Please use the following OTP to verify your account.
    </p>
    <br />
    <h1>${otp}</h1>
    <br />
    <p><b>Regards<b></p>
    <p><b>Amrita Centre for Entrepreneurship<b></p>
    </body>
</html>`
  );
}

export const AdminPasswordTemplate = (username: string, email: string, password: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Account Details</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
        </style>
    </head>
    <body>
        <p>Dear ${username},</p>
        <br />
        <p>
            Your admin account has been successfully created. Here are your credentials:
        </p>
        <br />
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <br />
        <p><b>Regards,</b></p>
        <p><b>Amrita Centre for Entrepreneurship</b></p>
    </body>
    </html>`;
};
