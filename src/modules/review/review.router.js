import express from 'express';
import * as reviewController from './review.controller.js';
import { tokenVerification } from '../../middlewares/verifyToken.middleware.js'; 
import { guard } from '../../middlewares/autherizedUser.middleware.js';

const router = express.Router();

router.use(tokenVerification)

router.get('/:prodId/review', guard.checkUser, reviewController.getReview)

router.get('/:prodId/reviews', guard.checkUser, reviewController.getReviews)

export default router;
