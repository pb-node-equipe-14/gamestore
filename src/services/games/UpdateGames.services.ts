import { Request, Response } from 'express';
import AppDataSource from '../../data-source';
import { Game } from '../../entities/games.entity';
import { AppError } from '../../errors/appError';
import { IGamesrequest } from '../../interfaces/games';

const updateGamesService = async (
  { name, price, age, launch, description, developer, image }: IGamesrequest,
  id: string,
) => {
  const GamesRepository = AppDataSource.getRepository(Game);

  const games = await GamesRepository.find();

  const game = games.find(game => game.id === id);

  if (!game) {
    throw new AppError('Game not found', 404);
  }

  await GamesRepository.update(game!.id, {
    name: name ? name : game.name,
    price: price ? price : game.price,
    age: age ? age : game.age,
    launch: launch ? launch : game.launch,
    description: description ? description : game.description,
    developer: developer ? developer : game.developer,
    image: image ? image : game.image,
  });

  return game;
};
export { updateGamesService };
