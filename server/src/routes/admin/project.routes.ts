import express from 'express';
// import authMiddleWare from '../../middlewares/auth.middleware';
import {
  createProject,
  getAllProjects,
} from '../../controllers/admin/project.controllers';
import { authenticateMiddleWare } from '../../middlewares/authenticate.middleware';
// import { assignStaffToBooking, getAllUserBookings, removeStaffFromBooking, uploadBookingImages } from "../../controllers/admin/project.controllers";
// import authMiddleWare from "../../middlewares/auth.middleware";
// import { bookingsMediaStorage } from "../../utils/CloudinaryMediaStorage";
// import multer from "multer";

const router = express.Router();

router.post('/', authenticateMiddleWare, createProject);
router.get('/', authenticateMiddleWare, getAllProjects);

export default router;
