import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import {
  mockedUser,
  mockedAdmin,
  mockedAdminLogin,
  mockedUserLogin,
  mockedGames,
} from '../../mocks';

describe('/games', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(res => {
        connection = res;
      })
      .catch(err => {
        console.error('Error during Data Source initialization', err);
      });

    await request(app).post('/users').send(mockedUser);
    await request(app).post('/users').send(mockedAdmin);
    const adminLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedGames);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /games -  Must be able to create a Game', async () => {
    const adminLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const categories = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    mockedGames.categoryId = categories.body[0].id;

    const response = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
      .send(mockedGames);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('age');
    expect(response.body).toHaveProperty('launch');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('developer');
    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('category');
    expect(response.status).toBe(201);
  });
  // TESTE de não criar um game sem permissão de administrador
  test('POST /games -  Should not be able to create game without authentication', async () => {
    const response = await request(app).post('/games').send(mockedGames);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /games -  Should not be able to create game that already exists', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .post('/games')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedGames);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('GET /games -  Should not be able to list games without authentication', async () => {
    const response = await request(app).get('/games');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('GET /games -  Must be able to list games', async () => {
    const adminLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const response = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test('GET /games/isActive -  Must be able to list games Actives', async () => {
    const Active = await request(app).get('/games/isActive');

    const response = Active.body.isActive;

    if (response) {
      expect(response.body).toHaveLength(1);
      expect(response.status).toBe(200);
    }
  });

  test('GET /games/:id -  Must list the game', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const gamesID = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
    console.log(`o valor de games é ${gamesID.body[0].id}`);

    const response = await request(app)
      .get(`/games/${gamesID.body[0].id}`)
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(200);
  });

  test('PATCH /games/:id -  should not be able to update games without authentication', async () => {
    const adminLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const gamesTobeUpdate = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/games/${gamesTobeUpdate.body[0].id}`,
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('PATCH /games/:id - should not be able to update game with invalid id', async () => {
    const newValues = { description: ' jogos de vampiros' };

    const admingLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const gamesTobeUpdateRequest = await request(app)
      .get('/games')
      .set('Authorization', token);
    const gamesTobeUpdateId = gamesTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/games/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set('Authorization', token)
      .send(newValues);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('PATCH /games/:id -  should be able to update games', async () => {
    const newValues = { description: 'um jogo sobre caçadores' };

    const admingLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const token = `Bearer ${admingLoginResponse.body.token}`;

    const GamesTobeUpdateRequest = await request(app)
      .get('/games')
      .set('Authorization', token);
    const GamesTobeUpdateId = GamesTobeUpdateRequest.body[0].id;

    const response = await request(app)
      .patch(`/games/${GamesTobeUpdateId}`)
      .set('Authorization', token)
      .send(newValues);

    const gamesUpdated = await request(app)
      .get('/games')
      .set('Authorization', token);

    expect(response.status).toBe(200);
    expect(gamesUpdated.body[0].description).toEqual('um jogo sobre caçadores');
    expect(gamesUpdated.body[0]).not.toHaveProperty('password');
  });

  test('DELETE /games/:id -  should not be able to delete game without authentication', async () => {
    const adminLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const gamesTobeDeleted = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/games/${gamesTobeDeleted.body[0].id}`,
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /games/:id -  should not be able to delete games not being admin', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const gamesTobeDeleted = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/games/${gamesTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test("DELETE /games/:id -  shouldn't be able to delete game with isActive = false", async () => {
    await request(app).post('/games').send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const gameTobeDeleted = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/games/${gameTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE -  should not be able to delete game with invalid id', async () => {
    await request(app).post('/games').send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);

    const response = await request(app)
      .delete(`/games/14975651-5sbe-422a-9a9d-5c23b3f944ce`)
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /games/:id -   Must be able to soft delete game', async () => {
    await request(app).post('/games').send(mockedAdmin);

    const adminLoginResponse = await request(app)
      .post('/login')
      .send(mockedAdminLogin);
    const gamesTobeDeleted = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/games/${gamesTobeDeleted.body[0].id}`)
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    const findGames = await request(app)
      .get('/games')
      .set('Authorization', `Bearer ${adminLoginResponse.body.token}`);
    expect(response.status).toBe(204);
    expect(findGames.body[0].isActive).toBe(false);
  });
});
