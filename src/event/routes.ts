import { validateToken } from "@/middleware/authentication/token";
import { Router } from "express";

const router = Router();

router.get("/event", handleGetAllEvents)
router.get("/event/:eventId", handleGetEventById)
router.post("/event/:eventId/register", validateToken, handleEventRegistration)

export default router;

