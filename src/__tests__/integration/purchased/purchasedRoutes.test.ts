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

    expect(response.body).toHaveLength(1);
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

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test('GET /purchased -  Should not be able to list purchased without authentication', async () => {
    const response = await request(app).get('/purchased');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
});
