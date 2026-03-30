import express from 'express';
import {
  createPayment,
  getAllPayments,
} from '../../controllers/admin/payment.controllers';
import authenticateMiddleWare from '../../middlewares/authenticate.middleware';

const router = express.Router();

router.post('/', authenticateMiddleWare, createPayment);
router.get('/', authenticateMiddleWare, getAllPayments);

export default router;
