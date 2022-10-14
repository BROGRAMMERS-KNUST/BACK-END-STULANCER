import express from "express";
import {
  forgotpassword,
  resetpassword,
} from "../controllers/passwordrecovery.js";

const router = express.Router();

router.get("/forgot-password", forgotpassword);
router.get("/reset-password", resetpassword);

export default router;
