const adminMiddleware = (request, response, next) => {
  const userAdmin = request.headers.authorization;

  if (!userAdmin) {
    return response.status(401).json();
  }

  return next();
};

export default adminMiddleware;
