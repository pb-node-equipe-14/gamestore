import { DataSource } from 'typeorm';
import app from '../../../app';
import AppDataSource from '../../../data-source';
import {
  mockedAdmin,
  mockedAdminLogin,
  mockedCart,
  mockedCategories,
  mockedGames,
} from '../../mocks';
import request from 'supertest';
describe('/favorite', () => {
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
  test('POST /favorite - Most be able to create a favorite', async () => {
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
      .post('/favorite')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCart);
    expect(response.body).toHaveProperty('id');
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
  test('POST /favorite - should not be able to post if game is already in favorite', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const getId = await request(app)
      .get('/favorite')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
    mockedCart.game_id = getId.body.games[0].id;
    const response = await request(app)
      .post('/favorite')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCart);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });
  test('POST /favorite - should not be able to create favorite without authentication', async () => {
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
    const response = await request(app).post('/favorite').send(mockedCart);
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
  test('GET /favorite - Must be able to list a favorite', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const response = await request(app)
      .get('/favorite')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
    expect(response.body).toHaveProperty('id');
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
  test('GET /favorite - should not be able to list favorite without authentication', async () => {
    const response = await request(app).get('/favorite');
    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });
  test('DELETE /favorite - Must be able to delete a game in favorite  ', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const getId = await request(app)
      .get('/favorite')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
    const response = await request(app)
      .delete(`/favorite/${getId.body.games[0].id}`)
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
    expect(response.status).toBe(204);
  });
});