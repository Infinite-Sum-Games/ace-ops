const RegistrationOTPTemplate = (username: string, otp: string) => {
    return(
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

export default RegistrationOTPTemplate;
