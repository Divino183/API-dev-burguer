import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User.js';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ erro: err.errors });
    }

    const { name, email, password, admin } = request.body;

    const verifyEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (verifyEmail) {
      return response
        .status(400)
        .json({ mensage: 'Este email ja está cadastrado' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password: passwordHash,
      admin,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }
}

export default new UserController();
