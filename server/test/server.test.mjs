// test/server.test.js
import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js'; // Import the app, not server.js
import { describe, it, before } from 'mocha';

let token; // Declare token globally for reuse
let propertyId;
let transactionId;

describe('Auth API', () => {
  it('should register a new buyer', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Buyer',
        email: 'buyer@example.com',
        password: 'password123',
        address: '123 Test Street',
        government_id: 'GOV12345',
        phone_number: '1234567890',
        role_id: 1 // Assuming role_id 1 corresponds to Buyer
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
  });

  it('should login an existing buyer', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'buyer@example.com',
        password: 'password123'
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    token = res.body.token; // Store token for later use
  });

  it('should access a protected route with a valid token', async () => {
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'This is a protected route');
  });
});

describe('Property API', () => {
  before(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'buyer@example.com',
        password: 'password123'
      });

    token = res.body.token; // Store token for property tests
  });

  it('should list a new property', async () => {
    const res = await request(app)
      .post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        ownerId: 1,
        address: '456 Property Lane',
        latitude: 40.7128,
        longitude: -74.0060,
        size: 1500.50,
        value: 250000.00,
        status: 'available',
        blockchainTxHash: 'txhash123'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('property');
    propertyId = res.body.property.property_id || res.body.property.id; // Handle different naming conventions
  });

  it('should get a property by its id', async () => {
    const res = await request(app)
      .get(`/api/properties/${propertyId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('property_id');
  });

  it('should get all properties', async () => {
    const res = await request(app)
      .get('/api/properties')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('Transaction API', () => {
  before(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'buyer@example.com',
        password: 'password123'
      });

    token = res.body.token; // Store token for transactions
  });

  it('should create a new transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        propertyId: propertyId, // Use property created in previous test
        buyerId: 1,
        sellerId: 2,
        transactionDate: new Date().toISOString(),
        amount: 250000.00,
        blockchainTxHash: 'txhash456',
        status: 'completed'
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('transaction');
    transactionId = res.body.transaction.transaction_id || res.body.transaction.id;
  });

  it('should get a transaction by id', async () => {
    const res = await request(app)
      .get(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('transaction_id');
  });

  it('should get transactions for a user', async () => {
    const res = await request(app)
      .get('/api/transactions/user/1')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
