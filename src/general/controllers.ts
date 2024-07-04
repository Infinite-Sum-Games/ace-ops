import { Request, Response } from "express"
import { loginResponse } from "../middleware/validation/login";

export const handleLogin = async(req: Request, res: Response) => {
    /*
     * JSON : {
     *     email
     *     Password (hashed)
     *  }
     */
    
    const response: loginResponse = {
        
    };
    res.status(200).json(response)
}

export const handleRegistration = async(req: Request, res: Response) => {
    /*
     * JSON : {
     *     first_name
     *     middle_name
     *     last_name
     *     email
     *     password (hashed)
     *     student (true/false),
     * }
     */
}

export const handleOTPVerification = async(req: Request, res: Response) => {
    /*
     * JSON : {
     *      request_id
     *      otp
     * }
     */
}
