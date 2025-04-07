// server.js
import express from 'express';
import dotenv from 'dotenv';
import supabase from './supabaseClient.js';
import cors from 'cors';
dotenv.config();


import authRoutes from './routes/authRoutes.js';
import landRoutes from './routes/landRoutes.js';
import userRoutes from './routes/userRoutes.js';
import offersRoutes from './routes/offersRoutes.js';
import transactionsRoutes from './routes/transactionsRoutes.js';
import escrowRoutes from './routes/escrowRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import propertyTransferRoutes from './routes/propertyTransferRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000","http://localhost:5001"], // Change this to match your frontend's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // If you need cookies or authentication
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes under /api
app.use('/api', authRoutes);
app.use('/api', propertyTransferRoutes); 
app.use('/api', landRoutes);
app.use('/api', userRoutes);
app.use('/api', offersRoutes);
app.use('/api', transactionsRoutes);
app.use('/api', escrowRoutes);
app.use('/api', statsRoutes);

async function testConnection() {
  // Replace 'your_table' with an actual table name in your database.
//  const { data, error } = await supabase.from('offers').select('*');
 // console.log('data:', data);
 // if (error) {
  //  console.error('Error querying Supabase:', error);
 // } else {
    //console.log('Query successful, data:', data);
//  }
}


testConnection();
// Example protected route
import { authenticateToken } from './middleware/authMiddleware.js';
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default app;
