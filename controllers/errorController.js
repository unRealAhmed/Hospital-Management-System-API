const AppError = require('../util/appErrors');

const handleValidationError = (err) => {
  const errors = err.errors[0]
  const message = `Invalid input data. ${errors}`;
  return new AppError(message, 400);
};

const handleSequelizeUniqueConstraintError = (err) => {
  const duplicateFieldName = err.errors.map((error) => error.message).join('. ') || '';
  const message = `Duplicate field value: ${duplicateFieldName}, Please use another value`;
  return new AppError(message, 400);
};

const handleForeignKeyError = (err) => {
  const message = `Foreign key constraint failed: ${err.original.detail}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = () =>
  new AppError('Invalid token, please login again', 401);

const handleTokenExpiredError = () =>
  new AppError('Token has expired, please login again', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      stack: err.stack,
      message: err.message,
      error: err,
    });
  }

  if (process.env.NODE_ENV === 'production') {
    let error = JSON.parse(JSON.stringify(err));
    error.message = err.message;

    if (error.message === 'Validation failed') {
      error = handleValidationError(error);
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      error = handleSequelizeUniqueConstraintError(error);
    } else if (error.name === 'SequelizeForeignKeyConstraintError') {
      error = handleForeignKeyError(error);
    } else if (error.name === 'JsonWebTokenError') {
      error = handleJsonWebTokenError();
    } else if (error.name === 'TokenExpiredError') {
      error = handleTokenExpiredError();
    }

    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
};
