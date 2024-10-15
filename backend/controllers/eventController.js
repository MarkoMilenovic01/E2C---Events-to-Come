import asyncHandler from '../middleware/asyncHandler.js';
import Event from '../models/eventModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
  
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};
  
    const count = await Event.countDocuments({ ...keyword });
    const events = await Event.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
  
    res.json({ events, page, pages: Math.ceil(count / pageSize) });
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


// @desc Create a event
// @route POST /api/events
// @access Private/Admin
const createEvent = asyncHandler(async (req, res) => {
    const event = new Event({
        image: "/images/sample.jpg",
        name: "Sample Name",
        description: "Sample description",
        date: Date.now(),
        location: "Sample location",
        price: 0,
        type: "Sample category",
        countInStock: 0,
        user: req.user._id
    });

    const createdEvent = await event.save();

    res.status(201).json(createdEvent);

});



// @desc Update a event
// @route PUT /api/events/:id
// @access Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
   const { name, price, description, image, location, date, type, countInStock} = req.body;

   const event = await Event.findById(req.params.id);

   if(event){
      event.name = name;
      event.price = price;
      event.description = description;
      event.image = image;
      event.type = type;
      event.location = location;
      event.date = date;
      event.countInStock = countInStock;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
   } else{
        res.status(404);
        throw new Error("Resource not found");
   }
});

// @desc Update a delete
// @route DELETE /api/events/:id
// @access Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
    const { name, price, description, image, location, date, type, countInStock} = req.body;
 
    const event = await Event.findById(req.params.id);
 
    if(event){
       await Event.deleteOne({_id: event._id});
       
       res.status(200).json({message: 'Event removed'});
    } else{
         res.status(404);
         throw new Error("Resource not found");
    }
 });

 // @desc Create a new review
// @route POST /api/events/:id/reviews
// @access Private
const createEventReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const event = await Event.findById(req.params.id);
 
    if(event){
     
        const alreadyReviewed = event.reviews.find((review) => review.user.toString() === req.user._id.toString());
        
        if(alreadyReviewed){
            res.status(400);
            throw new Error('Event already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        event.reviews.push(review);

        event.rating = event.reviews.reduce((acc, review) => acc + review.rating, 0)/event.reviews.length;
        await event.save();
        res.status(201).json({message: "Review added"})
    } else{
         res.status(404);
         throw new Error("Resource not found");
    }
 });



// @desc    Get top events
// @route   GET /api/events/top
// @access  Public
const getTopEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ rating: -1 }).limit(5);

  res.status(200).json(events);
});

 
 







export { getEvents, getEventById, createEvent, updateEvent, deleteEvent, createEventReview, getTopEvents};