interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  age: number;
}

interface IUserRequestTest {
  name: string;
  email: string;
  password?: string;
  isAdm: boolean;
  age: number;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
}

export { IUserRequest, IUserRequestTest, IUser, IUserLogin, IUserUpdate };
