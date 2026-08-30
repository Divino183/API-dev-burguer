import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ erro: err.errors });
    }

    const { name } = request.body;
    const { filename } = request.file;

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return response.status(400).json({ erro: 'Essa categoria ja Existe' });
    }

    const newCategory = await Category.create({
      name,
      path: filename,
    });

    return response.status(201).json({ newCategory });
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ erro: err.errors });
    }

    const { name } = request.body;
    const { id } = request.params;

    let path
    if (request.file) {
      const { filename } = request.file;
      path = filename;
    }

    const existingCategory = await Category.findOne({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return response.status(400).json({ erro: 'Essa categoria ja Existe' });
    }

    await Category.update({
      name,
      path,
    }, {
      where: {
        id
      }
    });

    return response.status(200).json();
  }

  async index(_request, response) {
    const category = await Category.findAll();

    return response.status(200).json(category);
  }
}

export default new CategoryController();
