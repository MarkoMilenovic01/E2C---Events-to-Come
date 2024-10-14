import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js'
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const port = process.env.PORT || 5000;

const app = express();

connectDB(); // Connect to MongoDB
app.use(express.json()); // Body parser
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send("API is running");
});

app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});
app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));