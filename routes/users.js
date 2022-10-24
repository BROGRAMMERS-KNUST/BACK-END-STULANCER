import express from 'express';
import {
  signup,
  signupserviceprovider,
  updateserviceProvider,
  loginHirer,
  loginServicer,
  feedback,
  updatehirer,
  updatebrandpics,
  updatestartingprice,
  serviceProviderInfo,
  getNumberofStuLancers,
  serviceProviderInfoSP,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signupservice', signupserviceprovider);
router.patch('/updateservice/:id', updateserviceProvider);
router.patch('/updatehirer/:id', updatehirer);
router.patch('/updatebrandpics/:id', updatebrandpics);
router.patch('/updatestartingprice/:id', updatestartingprice);
router.patch('/signupservice/:id', serviceProviderInfo);
router.patch('/signupservicesp/:id', serviceProviderInfoSP);
router.post('/loginhirer', loginHirer);
router.post('/loginservicer', loginServicer);
router.post('/feedback', feedback);
router.post('/getnumber', getNumberofStuLancers);

export default router;
