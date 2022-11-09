import { DataSource } from 'typeorm';
import app from '../../../app';
import AppDataSource from '../../../data-source';
import {
  mockedAdminLogin,
  mockedAdmin,
  mockedGames,
  mockedCategories,
  mockedCart,
  mockedUser17,
  mockedUser17Login,
  mockedCategories2,
  mockedGames2,
} from '../../mocks';
import request from 'supertest';

describe('/cart', () => {
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
    await request(app).post('/users').send(mockedUser17);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /cart - Must be able to create cart', async () => {
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
    const response = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCart);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('subtotal');
    expect(response.body).toHaveProperty('games');
    expect(response.body.games[0]).toHaveProperty('id');
    expect(response.body.games[0]).toHaveProperty('name');
    expect(response.body.games[0]).toHaveProperty('price');
    expect(response.body.games[0]).toHaveProperty('age');
    expect(response.body.games[0]).toHaveProperty('launch');
    expect(response.body.games[0]).toHaveProperty('isActive');
    expect(response.body.games[0]).toHaveProperty('description');
    expect(response.body.games[0]).toHaveProperty('developer');
    expect(response.body.games[0]).toHaveProperty('image');
    expect(response.status).toBe(201);
  });

  test('POST /cart - should not be able to post games in cart without authentication', async () => {
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
    const response = await request(app).post('/cart').send(mockedCart);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /cart -  should not be able to post if game is not compatible with age user', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUser17Login);

    const categories = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategories2);

    mockedGames2.categoryId = categories.body.id;
    const games = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedGames2);

    mockedCart.game_id = games.body.id;
    const response = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCart);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('POST /cart - should not be able to post if game is already in cart  ', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);

    const getId = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    mockedCart.game_id = getId.body.games[0].id;

    const response = await request(app)
      .post('/cart')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCart);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('GET /cart - Must be able to list a cart  ', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);

    const response = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('subtotal');
    expect(response.body).toHaveProperty('games');
    expect(response.body.games[0]).toHaveProperty('id');
    expect(response.body.games[0]).toHaveProperty('name');
    expect(response.body.games[0]).toHaveProperty('price');
    expect(response.body.games[0]).toHaveProperty('age');
    expect(response.body.games[0]).toHaveProperty('launch');
    expect(response.body.games[0]).toHaveProperty('isActive');
    expect(response.body.games[0]).toHaveProperty('description');
    expect(response.body.games[0]).toHaveProperty('developer');
    expect(response.body.games[0]).toHaveProperty('image');
    expect(response.status).toBe(200);
  });

  test('GET /cart - should not be able to list a cart without authentication  ', async () => {
    const response = await request(app).get('/cart');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /cart - Must be able to delete a game in cart  ', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);

    const getId = await request(app)
      .get('/cart')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/cart/${getId.body.games[0].id}`)
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
