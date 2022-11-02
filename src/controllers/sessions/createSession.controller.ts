import { Request, Response } from 'express';
import { createSessionService } from '../../services/sessions/createSession.service';

const createSessionController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await createSessionService({ email, password });

  return res.status(200).json({ token });
};

export { createSessionController };
