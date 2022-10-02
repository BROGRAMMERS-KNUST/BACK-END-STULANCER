import express from "express";
import { getProfiles, createProfile } from "../controllers/posts.js";

const router = express.Router();

router.get("/", getProfiles);
router.post("/", createProfile);
export default router;
