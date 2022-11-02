import AppDataSource from '../../data-source';
import { Cart } from '../../entities/cart.entity';
import { Game } from '../../entities/games.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { fixedFloat } from '../../utils';

const cartAddGameService = async (product_id: string, userEmail: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const gameRepository = AppDataSource.getRepository(Game);
  const cartRepository = AppDataSource.getRepository(Cart);

  //verificar se userEmail é como está na entity
  const user = await userRepository.findOne({
    where: {
      email: userEmail, //receber do controller
    },
  });

  const cart = await cartRepository.findOne({
    where: {
      id: user!.cart.id,
    },
  });

  const gameToAdd = await gameRepository.findOne({
    where: {
      id: product_id, //receber do controller
    },
  });

  if (!gameToAdd) {
    throw new AppError('Product not found', 404);
  }

  //verifica se cart e gameToAdd existir entra nesse if
  if (cart && gameToAdd) {
    if (cart.games.filter(game => game.name === gameToAdd.name).length > 0) {
      throw new AppError('Game is already in the cart', 409);
    }

    cart.games = [];
    //importar a untils para fazer o fixedFloat funcionar...
    cart.subtotal = fixedFloat(cart.subtotal + gameToAdd.price);

    await cartRepository.save(cart);

    return cart;
  }
};
export default cartAddGameService;
