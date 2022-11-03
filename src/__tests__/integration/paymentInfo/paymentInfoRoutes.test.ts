import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import { mockedUser, mockedUserLogin, mockedPaymentInfo } from '../../mocks';

describe('/payment_infos', () => {
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

  test('POST /payment_infos -  Must be able to create payment_infos', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .post('/payment_infos')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedPaymentInfo);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('dueDate');
    expect(response.body).toHaveProperty('number');
    expect(response.body).toHaveProperty('code');
    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  test('POST /payment_infos -  should not be able to create payment_infos without authentication', async () => {
    const response = await request(app)
      .post('/payment_infos')
      .send(mockedPaymentInfo);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('POST /payment_infos -  should not be able to create payment_infos that already exists', async () => {
    const userLoginResponse = await request(app)
      .post('/login')
      .send(mockedUserLogin);
    const response = await request(app)
      .post('/payment_infos')
      .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
      .send(mockedPaymentInfo);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });
});
