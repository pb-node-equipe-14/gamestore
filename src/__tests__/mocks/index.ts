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

export const mockedUserLogin: IUserLogin = {
  email: 'user@mail.com',
  password: '123',
};

export const mockedAdminLogin: IUserLogin = {
  email: 'user2@mail.com',
  password: '123',
};
