import { Router } from "express";
import { handleLoginInitiate, handleLoginComplete } from "./login.controllers";
import { validateToken } from "@/middleware/authentication/token";
import { handleCreateAdmin, handleEditAdmin, handleGetAllAdmins } from "./admin.controllers";
import { handleEditEvent, handleGerReleasedEvents, handleGetAllEvents, 
    handleGetDraftEvents, handleGetEventById, handleCreateEvent } from "./event.controllers";
import { handleGetAllCampaigns, handleGetPlannedCampaigns, 
    handleGetPublishedCampaigns } from "./campaign.controllers";

const router = Router();

// Login
router.post("/login", handleLoginInitiate);
router.post("/login/otp", validateToken, handleLoginComplete);

// Admin-Controls
router.get("/office", validateToken, handleGetAllAdmins);
router.post("/office/new", validateToken, handleCreateAdmin);
router.post("/office/edit/{adminId}", validateToken, handleEditAdmin);

// Events
router.get("/events", validateToken, handleGetAllEvents);
router.get("/events/drafts", validateToken, handleGetDraftEvents);
router.get("/events/released", validateToken, handleGerReleasedEvents);
router.get("/events/:eventId", validateToken, handleGetEventById);
router.post("/events/new", validateToken, handleCreateEvent);
router.post("/events/edit/:eventId", validateToken, handleEditEvent);

// Campaigns
router.get("/campaigns", validateToken, handleGetAllCampaigns);
router.get("/campaigns/:campaignId", validateToken, handleGetAllCampaigns);
router.get("/campaigns/planned", validateToken, handleGetPlannedCampaigns);
router.get("/campaigns/published", validateToken, handleGetPublishedCampaigns);
router.post("/campaigns/new", validateToken, handleGetPublishedCampaigns);
router.post("/campaigns/:campaignId/edit", validateToken, handleGetPublishedCampaigns);


export default router;
