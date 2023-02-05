// NOT FOUND MIDDLEWARE
const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};
// GENERAL ERROR HANDLER MIDDLEWARE
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '🍔' : error.stack,
  });
};
// EXPORT OUR MIDDLEWARES
module.exports = {
  notFound,
  errorHandler,
};
