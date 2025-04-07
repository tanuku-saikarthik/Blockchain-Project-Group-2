
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import supabase from '../supabaseClient.js';
import bcrypt from 'bcrypt';
import landRegistryContract from '../smartContract.js';
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
    const owner_id = req.userId; // The owner of the land is the logged-in user
  
    try {
      console.log("Land details:", { is_for_sale, location, price, size }); // For debugging
      console.log("Owner ID:", owner_id);
  
      // Insert land information into the database
      const { data, error } = await supabase
        .from('land')
        .insert([{ owner_id, location, size, price, is_for_sale }]);
  
      if (error) throw error;
      console.log("Land added successfully:", data); // For debugging
  
      // Ensure that area is calculated or provided correctly (size is used here)
      const area = size; // Adjust if size is not directly the area value
  
      // Interact with the smart contract for land listing
      const tx = await landRegistryContract.listProperty(
        location,
        area, // ensure this is the correct value for area
        ethers.parseUnits(String(price), "wei"),
        documentHash || document_url || "" // Use documentHash or document_url, whichever is available
      );
  
      const receipt = await tx.wait();
  
      // Return success response
      res.status(201).json({
        message: 'Land added successfully',
        land: data, // Return data from the database insertion
        contractTx: receipt.transactionHash
      });
    } catch (err) {
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
