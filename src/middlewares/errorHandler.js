import createHttpError from 'http-errors';
export function errorHandler(error, req, res, next) {
  if (createHttpError.isHttpError(error) === true) {
    return res
      .status(error.status)
      .json({ status: error.status, message: error.message });
  }

  res.status(500).json({ status: 500, message: 'Internal server error' });
}
