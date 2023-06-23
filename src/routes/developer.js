import express from "express";

import { resetDatabase } from "../controllers/developer.controller.js";

const router = express.Router();

router.post("/reset", resetDatabase);

export default router;
