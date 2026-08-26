import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule =
      await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  const getToken = async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'rocio@email.com',
        password: 'Password1!',
      });

    return login.body.token;
  };

  // 1
  it('GET /users returns an array of users and an OK status code', async () => {
    const token = await getToken();

    const req = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  // 2
  it('GET /users/:id returns a user and an OK status code', async () => {
    const token = await getToken();

    const req = await request(app.getHttpServer())
      .get('/users/dd6d2116-4b8a-46d0-878e-81204508f763')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty('id');
    expect(req.body).toHaveProperty('email');
  });

  // 3
  it('GET /products returns an array of products and an OK status code', async () => {
    const token = await getToken();

    const req = await request(app.getHttpServer())
      .get('/products');

    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });

  // 4
  it('GET /products/:id returns a product and an OK status code', async () => {
    const token = await getToken();

    const req = await request(app.getHttpServer())
      .get('/products/c50922e8-56ec-468c-9a9f-08e574951351');

    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty('id');
    expect(req.body).toHaveProperty('name');
  });

  // 5
  it('GET /orders/:id returns an order and an OK status code', async () => {
    const token = await getToken();

    const req = await request(app.getHttpServer())
      .get('/orders/06a5a2d1-e1dc-4b9a-b49f-22d39fce7ee9')
      .set('Authorization', `Bearer ${token}`);

    expect(req.status).toBe(200);
    expect(req.body).toHaveProperty('id');
  });

  afterEach(async () => {
    await app.close();
  });
});