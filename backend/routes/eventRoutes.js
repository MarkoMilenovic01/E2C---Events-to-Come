import express from 'express';
import { getEvents, getEventById, createEvent, updateEvent,deleteEvent, createEventReview, getTopEvents } from '../controllers/eventController.js';

import {protect, admin} from '../middleware/authMiddleware.js'
const router = express.Router();

router.route('/').get(getEvents).post(protect, admin, createEvent);
router.get('/top', getTopEvents);
router.route('/:id').get(getEventById).put(protect, admin, updateEvent).delete(protect, admin, deleteEvent);
router.route('/:id/reviews').post(protect, createEventReview);




export default router;