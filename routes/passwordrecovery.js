import express from 'express';
import {
  forgotpassword,
  forgotpasswordhirer,
  resetpassword,
  resetpasswordhirer,
} from '../controllers/passwordrecovery.js';

const router = express.Router();

router.post('/forgot-password', forgotpassword);
router.post('/forgot-password-hirer', forgotpasswordhirer);
router.post('/reset-password/:id/:token', resetpassword);
router.post('/reset-password-hirer/:id/:token', resetpasswordhirer);
// router.get("/reset-password/:id/:token", resetpassword);

export default router;
