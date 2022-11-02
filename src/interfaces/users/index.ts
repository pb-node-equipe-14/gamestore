export interface IUserRequest {
  name: string;
  email: string;
  password: string;
  isAdm: boolean;
  age: number;
}

export interface IUserRequestTest {
  name: string;
  email: string;
  password?: string;
  isAdm: boolean;
  age: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  age?: number;
}
