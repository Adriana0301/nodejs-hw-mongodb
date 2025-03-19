import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const errors = err.details.map(({ message, path, type }) => ({
      field: path.join('.'),
      message,
      type,
    }));

    next(createHttpError(400, { message: 'Validation failed', errors }));
  }
};
