import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IGamesrequest } from '../interfaces/games';

const gameCreateSchema: SchemaOf<IGamesrequest> = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().positive().required(),
  age: yup.number().positive().required(),
  launch: yup.string().required(),
  description: yup.string().required(),
  developer: yup.string().required(),
  image: yup.string().required(),
  categoryId: yup.string().required(),
});

const validateGameCreate =
  (schema: SchemaOf<IGamesrequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      try {
        const validatedData = await schema.validate(data, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.newUser = validatedData;

        next();
      } catch (err: any) {
        return res.status(400).json({
          message: err.errors?.join(', '),
        });
      }
    } catch (err) {
      next(err);
    }
  };

export { gameCreateSchema, validateGameCreate };
