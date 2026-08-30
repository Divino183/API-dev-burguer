import * as Yup from 'yup';
import product from '../models/Product.js';
import Category from '../models/Category.js';
import Order from '../schemas/Order.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        ),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ erro: err.errors });
    }

    const { UserId, UserName } = request;
    const { products } = request.body;

    const produtsId = products.map((product) => product.id);

    const findedProducts = await product.findAll({
      where: {
        id: produtsId,
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const mapedProduct = findedProducts.map((product) => {
      const quantity = products.find((p) => p.id === product.id).quantity;

      const newProduct = {
        id: product.id,
        name: product.name,
        url: product.url,
        price: product.price,
        category: product.category.name,
        quantity,
      };
      return newProduct;
    });

    const order = {
      user: {
        id: UserId,
        name: UserName,
      },
      products: mapedProduct,
      status: 'Pedido Realizado',
    };

    const newOrder = await Order.create(order);

    return response.status(200).json(newOrder);
  }

  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ erro: err.errors });
    }

    const { status } = request.body;
    const { id } = request.params;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return response.status(400).json({ erro: err.mensage });
    }
    

    return response.status(200).json(status);
  }

  async index(_request, response) {
    const orders = await Order.find()

    return response.status(200).json(orders)
  }
}

export default new OrderController();
