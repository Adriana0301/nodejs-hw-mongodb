import createHttpError from 'http-errors';
export function errorHandler(error, req, res, next) {
  if (error instanceof createHttpError.HttpError) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
}
