import { DataSource } from "typeorm";
import app from "../../../app";
import AppDataSource from "../../../data-source";
import { mockedPurchased, mockedUser, mockedUserLogin } from "../../mocks";
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
  
      await request(app).post('/users').send(mockedUser);
    });
  
    afterAll(async () => {
      await connection.destroy();
    });


    test('POST /purchased - Must be able to create purchased', async () =>{
        const userLoginResponse = await request(app)
        .post('/login')
        .send(mockedUserLogin);
        const response = await request(app)
        .post('/purchased')
        .set('Authorization',`Bearer ${userLoginResponse.body.token}`)
        .send(mockedPurchased);

        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('price');
        expect(response.status).toBe(201);
      });

    test('POST /purchased - Should not be able to create purchased without authentication', async ()=>{
        const response = await request(app)
        .post('/purchased')
        .send(mockedPurchased);
  
      expect(response.body).toHaveProperty('message');
      expect(response.status).toBe(401);
    })
    test('POST /purchased -  Should not be able to create purchased that already exists', async () => {
        const userLoginResponse = await request(app)
          .post('/login')
          .send(mockedUserLogin);
        const response = await request(app)
          .post('/purchased')
          .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
          .send(mockedPurchased);
    
        expect(response.body).toHaveProperty('message');
        expect(response.status).toBe(400);
      });

      test('GET /purchased -  Must be able to list purchased', async () => {
        await request(app).post('/purchased').send(mockedUser);
        const userLoginResponse = await request(app)
          .post('/login')
          .send(mockedUserLogin);
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