import jwt from 'jsonwebtoken';
import authConfig from '../../config/Auth.js';

const authMiddleware = (request, response, next) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'token não fornecido' });
  }

  const token = authToken.split(' ')[1];

  try {
    jwt.verify(token, authConfig.secret, (error, decoded) => {
      if (error) {
        throw Error;
      }

      request.UserId = decoded.id;
      request.UserName = decoded.name;
      request.userIsAdmin = decoded.admin;
    });
  } catch (_error) {
    return response.status(401).json({ error: 'token é invalido' });
  }

  return next();
};

export default authMiddleware;
