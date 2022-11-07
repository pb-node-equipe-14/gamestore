import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { mockedUser, mockedUserLogin, mockedCategories } from '../../mocks';

describe('/categories', () => {
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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /categories -  Must be able to create categories', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategories);

    expect(response.body).toHaveProperty('name');
    expect(response.status).toBe(201);
  });

  test('POST /categories -  Should not be able to create categories without authentication', async () => {
    const response = await request(app)
      .post('/categories')
      .send(mockedCategories);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /categories -  Should not be able to create categories that already exists', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedCategories);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('GET /categories -  Must be able to list categories', async () => {
    await request(app).post('/categories').send(mockedUser);
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  test('GET /categories -  Should not be able to list categories without authentication', async () => {
    const response = await request(app).get('/categories');

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('DELETE /categories/:id -  Must delete the categories', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);

    const getId = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      const response = await request(app)
      .delete(`/categories/${getId.body[0].id}`)
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});




