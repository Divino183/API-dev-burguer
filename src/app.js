import 'dotenv/config';
import Stripe from 'stripe';
import express from 'express';

import fileRoutsConfig from './config/fileRouts.cjs';

import routers from './routes.js';

import cors from 'cors';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRoutsConfig);
app.use('/category-file', fileRoutsConfig);
app.use(routers);

export default app;
