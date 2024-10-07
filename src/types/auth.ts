import { z } from "zod";

export const EventValidator = z.object({
    name : z.string().trim().min(3).regex(/^[a-zA-Z0-9_ ]+$/),
    startTime : z.coerce.date().optional(),
    endTime : z.coerce.date().optional(),
    guests : z.array(z.string().trim()),
    venue : z.string().trim().min(3).optional(),
    posterURL : z.string().url().optional(),
    recordingURL : z.string().url().optional(),
    tags : z.array(z.string()),
    status : z.enum(["Draft","Published"]).default("Draft").optional(),
    entry : z.enum(["Free","Paid"]).default("Free").optional(),
    mode : z.enum(["Online","Offline","Hybrid"]).default("Offline").optional(),
    eventFee : z.number().positive().finite().optional()
})

export const EventEditValidator = z.object({
    name : z.string().trim().min(3).regex(/^[a-zA-Z0-9_ ]+$/).optional(),
    startTime : z.coerce.date().optional(),
    endTime : z.coerce.date().optional(),
    guests : z.array(z.string().trim()).optional(),
    venue : z.string().trim().min(3).optional(),
    posterURL : z.string().url().optional(),
    recordingURL : z.string().url().optional(),
    tags : z.array(z.string()).optional(),
    status : z.enum(["Draft","Published"]).default("Draft").optional(),
    entry : z.enum(["Free","Paid"]).default("Free").optional(),
    mode : z.enum(["Online","Offline","Hybrid"]).default("Offline").optional(),
    eventFee : z.number().positive().finite().optional()
})