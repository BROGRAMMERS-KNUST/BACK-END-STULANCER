import express from "express";
import {
  forgotpassword,
  resetpassword,
} from "../controllers/passwordrecovery.js";

const router = express.Router();

router.post("/forgot-password", forgotpassword);
router.post("/reset-password", resetpassword);

export default router;
