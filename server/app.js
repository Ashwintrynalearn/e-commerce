import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';

import authRouter from './routes/auth.routes.js';
import cartRouter from './routes/cart.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';
import healthCheckRouter from './routes/healthCheck.routes.js';

import connectToDatabase from './database/mongodb.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/health', healthCheckRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the agriculture API!');
});

app.listen(PORT, async () => {
  console.log(`Agriculture API is running on http://localhost:${PORT}`);

  await connectToDatabase();
});

export default app;