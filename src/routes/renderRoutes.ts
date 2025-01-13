import { Router } from "express";
import { renderPage } from "../controllers/clickController";

const router = Router();

router.get("/", renderPage);

export const renderRoutes = router;
