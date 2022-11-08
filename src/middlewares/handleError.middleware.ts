import { Request, Response, NextFunction, request } from 'express';
import { AppError } from '../errors/appError';

const handleErrorMiddleware = async (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }
  console.log(error);

  return response.status(500).json({ message: 'Internal server error' });
};

export { handleErrorMiddleware };
