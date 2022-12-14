import AppDataSource from '../../data-source';
import { Cart } from '../../entities/cart.entity';
import { Game } from '../../entities/games.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { fixedFloat } from '../../utils';

const cartAddGameService = async (user_id: string, game_id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const gameRepository = AppDataSource.getRepository(Game);
  const cartRepository = AppDataSource.getRepository(Cart);

  const user = await userRepository.findOne({
    where: {
      id: user_id,
    },
  });

  const cart = await cartRepository.findOne({
    where: {
      id: user?.cart.id,
    },
  });

  const games = await gameRepository.find();

  const gameToAdd = games.find(game => game.id === game_id);

  if (!gameToAdd) {
    throw new AppError('Game not found', 404);
  }

  if (user!.age < gameToAdd.age) {
    throw new AppError('The game is not compatible with your age', 400);
  }

  if (cart && gameToAdd) {
    if (cart.games.filter(game => game.name === gameToAdd.name).length > 0) {
      throw new AppError('Game is already in the cart', 409);
    }

    cart.games = [...cart.games, gameToAdd];
    cart.subtotal = fixedFloat(cart.subtotal + gameToAdd.price);

    await cartRepository.save(cart);

    return cart;
  }
};
export { cartAddGameService };
