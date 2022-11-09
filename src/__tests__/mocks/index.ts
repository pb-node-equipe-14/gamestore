import { ICategoryRequest } from '../../interfaces/categories';
import { IFavoriteRequest } from '../../interfaces/favorite';
import { IGamesrequest } from '../../interfaces/games';
import { IPaymentInfoRequest } from '../../interfaces/paymentInfo/paymentInfo.entity';
import { IPurchasedRequest } from '../../interfaces/purchased';
import {
  IUserLogin,
  IUserRequest,
  IUserRequestTest,
} from '../../interfaces/users';

export const mockedUser: IUserRequest = {
  name: 'User',
  email: 'user@mail.com',
  age: 25,
  isAdm: false,
  password: '123',
};

export const mockedUserWithoutPassword: IUserRequestTest = {
  name: 'User',
  email: 'user@mail.com',
  age: 25,
  isAdm: false,
};

export const mockedAdmin: IUserRequest = {
  name: 'User 2',
  email: 'user2@mail.com',
  age: 28,
  isAdm: true,
  password: '123',
};

export const mockedUser17: IUserRequest = {
  name: 'User',
  email: 'user3@mail.com',
  age: 17,
  isAdm: true,
  password: '123',
};

export const mockedUserLogin: IUserLogin = {
  email: 'user@mail.com',
  password: '123',
};

export const mockedAdminLogin: IUserLogin = {
  email: 'user2@mail.com',
  password: '123',
};

export const mockedUser17Login: IUserLogin = {
  email: 'user3@mail.com',
  password: '123',
};

export const mockedPaymentInfo: IPaymentInfoRequest = {
  name: 'carlos',
  dueDate: '2022-01-01',
  code: '222',
  number: '12345678',
};

export const mockedCategories: ICategoryRequest = {
  name: 'Terror',
};

export const mockedCategories2: ICategoryRequest = {
  name: 'Aventura',
};

export const mockedPurchased: IPurchasedRequest = {
  name: 'God of war',
  description: 'This game speak about a God',
  price: 234.33,
};

export const mockedGames: IGamesrequest = {
  name: 'bleach',
  price: 23,
  age: 18,
  launch: '17/08/2020',
  description: 'um jogo sobre piratas',
  developer: 'Bandai CAMPCOM',
  image:
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1201240/header.jpg?t=1667210470',
  categoryId: '',
};

export const mockedGames2: IGamesrequest = {
  name: 'bleach 2',
  price: 23,
  age: 18,
  launch: '17/08/2020',
  description: 'um jogo sobre piratas',
  developer: 'Bandai CAMPCOM',
  image:
    'https://cdn.cloudflare.steamstatic.com/steam/apps/1201240/header.jpg?t=1667210470',
  categoryId: '',
};

export const mockedCart = {
  game_id: '',
};

export const mockedFavorite: IFavoriteRequest = {
  game_id: '',
};
