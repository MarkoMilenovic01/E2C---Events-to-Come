import express from 'express';
import events from './data/events.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();


app.get('/api/events', (req, res) => {
    res.json(events);
});

app.get('/api/events/:id', (req, res) => {
    const event = events.find((event) => event._id == req.params.id);
    res.json(event);
})

app.listen(port, () => console.log(`Server running on port ${port}`));