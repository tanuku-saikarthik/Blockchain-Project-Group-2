
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import supabase from '../supabaseClient.js';
import bcrypt from 'bcrypt';
import landRegistryContract from '../smartContract.js';
import listPropertyy from './bcController.js';
import getAllProperties from './bcController.js';
import { ethers } from 'ethers';


// Middleware to verify JWT token and extract userId
export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

// Add Land
export const addLand = async (req, res) => {
    const { is_for_sale, location, price, size, documentHash, document_url } = req.body;
    const owner_id = req.userId;
  
    try {
      // 1. Add to Supabase DB
      const { data, error } = await supabase
        .from('land')
        .insert([{ owner_id, location, size, price, is_for_sale }])
        .select();
  
      if (error) throw error;
  
      const area = BigInt(size); // Optional if you use it elsewhere
      const priceInt = ethers.parseUnits(String(price), "ether");
      const docRef = documentHash || document_url || "N/A";
  
      // 2. Interact with Smart Contract
      const tx = await landRegistryContract.listProperty(location, priceInt);
      const receipt = await tx.wait();
  
      // 3. Fetch from on-chain
      const count = await landRegistryContract.propertyCount();
      const onChainLand = [];
  
      for (let i = 0; i < count; i++) {
        const p = await landRegistryContract.properties(i);
        onChainLand.push({
          propertyId: i,
          location: p.location,
          askingPrice: ethers.formatEther(p.askingPrice),
          status: p.status,
          seller: p.seller,
        });
      }
  
      // 4. Send response once
      res.status(201).json({
        message: 'Land added successfully',
        land: data[0],
        contractTx: receipt.transactionHash,
        onChainLand,
      });
  
    } catch (err) {
      console.error("Error adding land:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
  
  

// Fetch Lands
export const fetchLandsbyId = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('land')
            .select('*')
            .eq('owner_id', req.userId);

        if (error) throw error;

        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const fetchLands = async (req, res) => {
  try {
      const { data, error } = await supabase
          .from('land')
          .select('*');

      if (error) throw error;

      res.json(data);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};

// Update Property
export const updateProperty = async (req, res) => {
    const { propertyId } = req.params;
    const { location, size, price, is_for_sale } = req.body;

    try {
        const { data, error } = await supabase
            .from('lands')
            .update({ location, size, price, is_for_sale })
            .eq('id', propertyId)
            .eq('owner_id', req.userId);

        if (error) throw error;

        res.json({ message: 'Property updated successfully', land: data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Cancel Property Listing
export const cancelPropertyListing = async (req, res) => {
    const { propertyId } = req.params;

    try {
        const { data, error } = await supabase
            .from('lands')
            .delete()
            .eq('id', propertyId)
            .eq('owner_id', req.userId);

        if (error) throw error;

        res.json({ message: 'Property listing canceled successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
