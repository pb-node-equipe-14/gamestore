import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import AppDataSource from '../data-source';
import { Game } from '../entities/games.entity';
import { AppError } from '../errors/appError';

const verifyGameIsActiveMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const gamesRepository = AppDataSource.getRepository(Game);

  // pega tudo de game do banco de dados
  const games = await gamesRepository.find();

  console.log(`o valor de games é : ${games} `);

  const gamesFiltered = games.filter(gameActive => {
    return gameActive.isActive === true;
  });

  console.log(`o valor de gamesFiltered é : ${gamesFiltered} `);
  /*
  // pega tudo da requisição
  const game = req.body;

  // verifica as chaves que vem dentro da requisição
  const keys = Object.keys(game);

  // busca chaves que são isActive
  const searchIsActive = keys.find(key => key === 'isActive');

  if (!searchIsActive) {
    throw new AppError('Game is not Active!');
  }*/
  next();
};
export { verifyGameIsActiveMiddleware };
