import { Request, Response } from "express";

export const handleLoginInitiate = async (req: Request, res: Response) => {
    /*
      JSON 
      {
         "adminEmail"  : <email>
      }
     *
      Response {
        tempToken (tempId as payload)
      } + Mail (with OTP)
     */
}

export const handleLoginComplete = async (req: Request, res: Response) => {
   /*
     JSON (required authorization)
     {
        "oneTimePassword": <otp>
     }
    * 
     Response {
        Token (permanent = 24hrs) (email as payload)
        userId
        FirstName
        MiddleName
        LastName
     }
    */
}
