import express from "express";

import {
  addCafe,
  getCafes,
  getCafe,
  modifyCafe,
  deleteCafe,
} from "../controllers/cafes.controller.js";

import { cafes } from "../validators/index.js";
const { paramId, bodyId, bodyName } = cafes;

const router = express.Router();

router.get("/", getCafes);
router.get("/:id", paramId, getCafe);
router.post("/", bodyName, addCafe);
router.put("/:id", bodyId, paramId, bodyName, modifyCafe);
router.delete("/:id", paramId, deleteCafe);

export default router;
