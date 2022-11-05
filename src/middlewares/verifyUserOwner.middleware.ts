import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/appError';

const verifyOwnerMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (req.user.isAdm) {
    return next();
  } else {
    if (req.user.id === id) return next();
    throw new AppError('Unauthorized', 401);
  }
};

export { verifyOwnerMiddleware };
