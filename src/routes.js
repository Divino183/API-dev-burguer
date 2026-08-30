import { Router } from 'express';
import multer from 'multer';
import OrderController from './app/controllers/OrderController.js';
import CategoyController from './app/controllers/CategoryController .js';
import ProductController from './app/controllers/ProductController.js';
import SessionController from './app/controllers/SessionController.js';
import UserController from './app/controllers/UserController.js';
import multerConfig from './config/multer.cjs';
import authMiddleware from './app/middleware/Auth.js';
import adminMiddleware from './app/middleware/Admin.js';

const routers = new Router();

const upload = multer(multerConfig);

// rotas de usuarios
routers.post('/users', UserController.store);
routers.post('/sessions', SessionController.store);

// rotas de produtos
routers.use(authMiddleware);
routers.post(
  //cria
  '/product',
  adminMiddleware,
  upload.single('file'),
  ProductController.store,
);
routers.get('/product', ProductController.index); //lista
routers.put(
  //atualizar
  '/product/:id',
  adminMiddleware,
  upload.single('file'),
  ProductController.update,
);

// rotas de categorias
routers.post(
  //cria
  '/category',
  adminMiddleware,
  upload.single('file'),
  CategoyController.store,
);
routers.get('/category', CategoyController.index); //lista
routers.put(
  //atualizar
  '/category/:id',
  adminMiddleware,
  upload.single('file'),
  ProductController.update,
);

// rotas de pedidos
routers.post('/orders', OrderController.store);
routers.put('/orders/:id', adminMiddleware, OrderController.update);
routers.get('/orders', OrderController.index); 

export default routers;