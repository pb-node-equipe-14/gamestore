import AppDataSource from '../../data-source';
import { Cart } from '../../entities/cart.entity';
import { Game } from '../../entities/games.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { fixedFloat } from '../../utils';

const cartAddGameService = async (user_id: string, gamee_id: string, ) => {
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
      id: user!.cart.id,
    },
  });

  const gameToAdd = await gameRepository.findOne({
    where: {
      id: gamee_id, 
    },
  });

  if (!gameToAdd) {
    throw new AppError('Product not found', 404);
  }

  if (cart && gameToAdd) {
    if (cart.games.filter(game => game.name === gameToAdd.name).length > 0) {
      throw new AppError('Game is already in the cart', 409);
    }

    cart.games = [];
    cart.subtotal = fixedFloat(cart.subtotal + gameToAdd.price);

    await cartRepository.save(cart);

    return cart;
  }
};
export default cartAddGameService;
