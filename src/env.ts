// Smart way of managing environment variables

import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z, ZodError } from "zod";

const stringBoolean = z.coerce.string().transform((val) => {
    return val === "true";
}).default("false");

const EnvSchema = z.object({

    NODE_ENV: z.string().default("development"),
    PORT: z.string(),

    DB_CONNECTION_STRING: z.string(),
    // --- The connection string must haves:
    // DB_HOST: z.string()
    // DB_USER: z.string()
    // DB_PASSWORD: z.string(),
    // DB_NAME: z.string(),
    // DB_PORT: z.coerce.string(),
    DB_MIGRATING: stringBoolean, // run-time flags (not needed in .env)
    DB_SEEDING: stringBoolean,   // run-time flags (not needed in .env)

    MAIL_HOST: z.string(),
    EMAIL_ID: z.string(),
    EMAIL_APP_KEY: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
    EnvSchema.parse(process.env);
} catch (error){
    if (error instanceof ZodError){
        let message = "Missing requried values in .env\n";
        error.issues.forEach((issue) => {
            message += issue.path[0] + "\n";
        });
        const e = new Error(message);
        e.stack = "";
        throw e;
     } else {
        // Setup better logging
        console.error(error);
    }
}

export default EnvSchema.parse(process.env);
