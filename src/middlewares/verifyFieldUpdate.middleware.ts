import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/appError';

const verifyFieldUpdatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.body;

  const keys = Object.keys(user);

  const notChange = keys.find(
    key => key === 'isActive' || key === 'isAdm' || key === 'id',
  );

  if (notChange) throw new AppError(`${notChange} cannot be changed`, 401);

  next();
};

export default verifyFieldUpdatedMiddleware;
