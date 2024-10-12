import asyncHandler from '../middleware/asyncHandler.js';
import Event from '../models/eventModel.js';

// @desc Fetch all events
// @route GET /api/events
// @access Public
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({});
    res.json(events);
});

// @desc Fetch an event
// @route GET /api/event/:id
// @access Public
const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if(event){
        res.json(event);
    }

    res.status(404);
    throw new Error('Resource not found');
});


export { getEvents, getEventById};