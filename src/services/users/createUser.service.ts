import { hash } from 'bcryptjs';
import AppDataSource from '../../data-source';
import { Cart } from '../../entities/cart.entity';
import { Favorite } from '../../entities/favorite.entity';
import { User } from '../../entities/user.entity';
import { AppError } from '../../errors/appError';
import { IUserRequest } from '../../interfaces/users';

const createUserService = async ({
  name,
  email,
  age,
  password,
  isAdm,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const cartRepository = AppDataSource.getRepository(Cart);
  const favoriteRepository = AppDataSource.getRepository(Favorite);

  const users = await userRepository.find();

  const emailAlreadyExists = users.find(user => user.email === email);

  if (emailAlreadyExists) {
    throw new AppError('Email already exists');
  }

  const cart = cartRepository.create({
    subtotal: 0,
  });

  await cartRepository.save(cart);

  const favorite = favoriteRepository.create();

  await favoriteRepository.save(favorite);

  const hashedPass = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    age,
    password: hashedPass,
    isAdm,
    cart: cart,
    favorite: favorite,
  });

  await userRepository.save(user);

  return user;
};
export { createUserService };
