import AppDataSource from '../../data-source';
import { Cart } from '../../entities/cart.entity';
import { Purchased } from '../../entities/purchased.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';

const createPurchasedService = async (user_id: string) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const userRepository = AppDataSource.getRepository(User);
  const purchasedRepository = AppDataSource.getRepository(Purchased);

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

  if (cart && user) {
    if (cart.games.length === 0) {
      throw new AppError('Cart is empty');
    }

    const purchased = new Purchased();
    purchased.user = user;
    purchased.games = cart.games;
    purchased.aquisitonAt = new Date();

    purchasedRepository.create(purchased);
    await purchasedRepository.save(purchased);

    cart.games = [];
    cart.subtotal = 0;
    await cartRepository.save(cart);

    const newPurchased = purchasedRepository.find({
      where: {
        id: purchased.id,
      },
    });

    return newPurchased;
  }
};
export { createPurchasedService };
