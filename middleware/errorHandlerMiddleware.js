const errorHandlerMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default errorHandlerMiddleware;
