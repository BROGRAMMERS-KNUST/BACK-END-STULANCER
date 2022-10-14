import express from 'express';
import {
  signup,
  signupserviceprovider,
  updateserviceProvider,
  loginHirer,
  loginServicer,
  feedback,
  updatehirer,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signupservice', signupserviceprovider);
router.patch('/updateservice/:id', updateserviceProvider);
router.patch('/updatehirer/:id', updatehirer);
router.patch('/signupservice/:id', updateserviceProvider);
router.post('/loginhirer', loginHirer);
router.post('/loginservicer', loginServicer);
router.post('/feedback', feedback);

export default router;
