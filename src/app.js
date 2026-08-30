import express from 'express';

import fileRoutsConfig from './config/fileRouts.cjs';

import routers from './routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routers);
app.use('/product-file', fileRoutsConfig);
app.use('/category-file', fileRoutsConfig);

export default app;
