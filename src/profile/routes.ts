import { validateToken } from "@/middleware/authentication/token";
import { Router } from "express";

const router = Router();

router.get("/profile/:profileId", validateToken, handleGetProfile);
router.post("/profile/:profileId/edit", validateToken, handleEditProfile);

export default router;
