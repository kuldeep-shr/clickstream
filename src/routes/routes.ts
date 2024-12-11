import { Router } from "express";
import { renderPage, handleButtonClick } from "../controllers/clickController";
import { rateLimiterMiddleware } from "../middlewares/rateLimiter";
import { loggerMiddleware } from "../middlewares/logger";

const router = Router();

// Apply logger middleware globally to all routes
router.use(loggerMiddleware);

router.get("/", renderPage);
router.post("/click/:button", rateLimiterMiddleware, handleButtonClick);

export const allRoutes = router;
