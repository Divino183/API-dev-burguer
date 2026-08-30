import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import AuthConfig from '../../config/Auth.js';
import User from '../models/User.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const IncorrectEmailOrPassword = () => {
      return response.status(400).json({ error: 'Email ou senha Incorretos' });
    };

    const isValid = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    });

    if (!isValid) {
      IncorrectEmailOrPassword();
    }

    const { email, password } = request.body;

    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (!existingUser) {
      IncorrectEmailOrPassword();
    }

    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!correctPassword) {
      IncorrectEmailOrPassword();
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        admin: existingUser.admin,
        name: existingUser.name,
      },
      AuthConfig.secret,
      {
        expiresIn: AuthConfig.expiresIn,
      },
    );

    return response.status(200).json({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      admin: existingUser.admin,
      token,
    });
  }
}

export default new SessionController();
