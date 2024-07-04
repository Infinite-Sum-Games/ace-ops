import { z } from "zod";

export type loginRequest = {
    email: string,
    password: string,
}

const loginRequestValidator = {

}

export type loginResponse = {
    accessKey: string,
    message: string,
}
