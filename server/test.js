import request from 'supertest';
import app from './app.js';
import { supabase } from './supabaseClient.js';
import { ethers } from 'ethers';
import landRegistryContract from './smartContract.js';

// Test configuration
const TEST_PORT = 5001;
let server;
let authToken;
let testUserId;
let testLandId;
let testOfferId;
const testUser = {
  email: `testuser${Date.now()}@example.com`,
  password: 'testpassword123',
  wallet_address: '0xTestWalletAddress'
};

// Set up test environment
beforeAll(async () => {
  server = app.listen(TEST_PORT);
  
  // Create a test user
  await request(app)
    .post('/api/register')
    .send({
      ...testUser,
      full_name: 'Test User',
      role_id: 3, // Assuming 3 is buyer role
      age: 30,
      phone_number: '1234567890',
      pan_number: 'ABCDE1234F',
      aadhaar_number: '123456789012',
      aadhaar_file_url: 'http://example.com/aadhaar.pdf'
    });

  // Login to get token
  const loginRes = await request(app)
    .post('/api/login')
    .send({
      email: testUser.email,
      password: testUser.password
    });
  
  authToken = loginRes.body.token;
  testUserId = loginRes.body.user.id;
});

// Clean up after tests
afterAll(async () => {
  // Clean test data
  await supabase.from('users').delete().eq('email', testUser.email);
  await supabase.from('land').delete().eq('owner_id', testUserId);
  await supabase.from('offers').delete().eq('buyer_id', testUserId);
  
  await server.close();
});

describe('Auth API Tests', () => {
  test('User registration creates DB record', async () => {
    const testEmail = `newuser${Date.now()}@example.com`;
    
    const response = await request(app)
      .post('/api/register')
      .send({
        ...testUser,
        email: testEmail,
        wallet_address: '0xNewWalletAddress'
      });
    
    expect(response.statusCode).toBe(201);
    
    // Check database
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', testEmail)
      .single();

    expect(user).toBeDefined();
    expect(user.wallet_address).toBe('0xNewWalletAddress');
    
    // Cleanup
    await supabase.from('users').delete().eq('email', testEmail);
  });
});

describe('Land API Tests', () => {
  test('Add land creates DB record and on-chain entry', async () => {
    const response = await request(app)
      .post('/api/add-land')
      .set('Authorization', `Bearer ${authToken}`)
      .field('location', 'Test Location')
      .field('size', 1000)
      .field('price', 500000)
      .field('is_for_sale', true)
      .field('documentHash', 'testHash123')
      .attach('document', 'test/test-file.pdf');
    
    expect(response.statusCode).toBe(201);
    testLandId = response.body.land.id;

    // Check database
    const { data: dbLand } = await supabase
      .from('land')
      .select('*')
      .eq('id', testLandId)
      .single();

    expect(dbLand).toBeDefined();
    expect(dbLand.location).toBe('Test Location');

    // Check on-chain
    const onChainLand = await landRegistryContract.properties(testLandId);
    expect(onChainLand.location).toBe('Test Location');
    expect(onChainLand.askingPrice).toBe(
      ethers.utils.parseUnits('500000', 'wei')
    );
  });

  test('Update land modifies DB and on-chain', async () => {
    const response = await request(app)
      .put(`/api/update-property/${testLandId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        location: 'Updated Location',
        price: 600000
      });
    
    expect(response.statusCode).toBe(200);

    // Check database
    const { data: dbLand } = await supabase
      .from('land')
      .select('*')
      .eq('id', testLandId)
      .single();

    expect(dbLand.price).toBe(600000);

    // Check on-chain
    const onChainLand = await landRegistryContract.properties(testLandId);
    expect(onChainLand.askingPrice).toBe(
      ethers.utils.parseUnits('600000', 'wei')
    );
  });
});

describe('Offer API Tests', () => {
  test('Create offer creates DB record and on-chain entry', async () => {
    const response = await request(app)
      .post('/api/offers')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        landId: testLandId,
        offerPrice: 550000,
        escrowAmount: 100000,
        notes: 'Test offer'
      });
    
    expect(response.statusCode).toBe(201);
    testOfferId = response.body.offer.offer_id;

    // Check database
    const { data: dbOffer } = await supabase
      .from('offers')
      .select('*')
      .eq('offer_id', testOfferId)
      .single();

    expect(dbOffer.offer_price).toBe(550000);

    // Check on-chain
    const onChainOffer = await landRegistryContract.offers(testOfferId);
    expect(onChainOffer.offerPrice).toBe(
      ethers.utils.parseUnits('550000', 'wei')
    );
  });

  test('Accept offer updates DB and on-chain state', async () => {
    const response = await request(app)
      .post(`/api/buyer-offers/${testOfferId}/accept`)
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(response.statusCode).toBe(200);

    // Check database
    const { data: dbOffer } = await supabase
      .from('offers')
      .select('*')
      .eq('offer_id', testOfferId)
      .single();

    expect(dbOffer.status).toBe('Accepted');

    // Check on-chain
    const onChainOffer = await landRegistryContract.offers(testOfferId);
    expect(onChainOffer.status).toBe(2); // Assuming 2 = accepted status
  });
});

describe('Blockchain Verification Helpers', () => {
  const verifyOnChainLand = async (landId) => {
    const property = await landRegistryContract.properties(landId);
    return {
      exists: property.location !== '',
      price: property.askingPrice.toString(),
      active: property.isActive
    };
  };

  const verifyOnChainOffer = async (offerId) => {
    const offer = await landRegistryContract.offers(offerId);
    return {
      exists: offer.offerPrice > 0,
      status: offer.status,
      buyer: offer.buyer
    };
  };

  test('Verify land exists on-chain', async () => {
    const onChainData = await verifyOnChainLand(testLandId);
    expect(onChainData.exists).toBe(true);
    expect(onChainData.price).toBe(ethers.utils.parseUnits('600000', 'wei').toString());
  });

  test('Verify offer exists on-chain', async () => {
    const onChainData = await verifyOnChainOffer(testOfferId);
    expect(onChainData.exists).toBe(true);
    expect(onChainData.status).toBe(2);
  });
});