import express from 'express';

import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js'

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB
const app = express();

app.get('/', (req, res) => {
    res.send("API is running");
});

app.use('/api/events', eventRoutes);

app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));