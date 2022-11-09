import { DataSource } from 'typeorm';
import app from '../../../app';
import AppDataSource from '../../../data-source';
import {
  mockedPurchased,
  mockedAdminLogin,
  mockedAdmin,
  mockedGames,
  mockedCategories,
  mockedCart,
} from '../../mocks';
import request from 'supertest';

describe('/purchased', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(res => {
        connection = res;
      })
      .catch(err => {
        console.error('Error during Data Source initialization', err);
      });

    await request(app).post('/users').send(mockedAdmin);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /purchased - Must be able to create purchased', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);

    const categories = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategories);

    mockedGames.categoryId = categories.body.id;
    const games = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedGames);
    mockedCart.game_id = games.body.id;
    const cart = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCart);

    const response = await request(app)
      .post('/purchased')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('aquisitonAt');
    expect(response.body[0]).toHaveProperty('games');
    expect(response.body[0].games[0]).toHaveProperty('id');
    expect(response.body[0].games[0]).toHaveProperty('name');
    expect(response.body[0].games[0]).toHaveProperty('price');
    expect(response.body[0].games[0]).toHaveProperty('age');
    expect(response.body[0].games[0]).toHaveProperty('launch');
    expect(response.body[0].games[0]).toHaveProperty('isActive');
    expect(response.body[0].games[0]).toHaveProperty('description');
    expect(response.body[0].games[0]).toHaveProperty('developer');
    expect(response.body[0].games[0]).toHaveProperty('image');

    expect(response.status).toBe(201);
  });

  test('POST /purchased - Should not be able to create purchased without authentication', async () => {
    const response = await request(app)
      .post('/purchased')
      .send(mockedPurchased);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /purchased -  Must be able to list purchased', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const response = await request(app)
      .get('/purchased')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('aquisitonAt');
    expect(response.body[0]).toHaveProperty('games');
    expect(response.body[0].games[0]).toHaveProperty('id');
    expect(response.body[0].games[0]).toHaveProperty('name');
    expect(response.body[0].games[0]).toHaveProperty('price');
    expect(response.body[0].games[0]).toHaveProperty('age');
    expect(response.body[0].games[0]).toHaveProperty('launch');
    expect(response.body[0].games[0]).toHaveProperty('isActive');
    expect(response.body[0].games[0]).toHaveProperty('description');
    expect(response.body[0].games[0]).toHaveProperty('developer');
    expect(response.body[0].games[0]).toHaveProperty('image');
    expect(response.status).toBe(200);
  });

  test('POST /purchased -  Should not be able to purchase with cart is empty', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const response = await request(app)
      .post('/purchased')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('GET /purchased -  Should not be able to list purchased without authentication', async () => {
    const response = await request(app).get('/purchased');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
