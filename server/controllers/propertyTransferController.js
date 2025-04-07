// controllers/propertyTransferController.js
import supabase from '../supabaseClient.js';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

import landRegistryContract from '../smartContract.js';

export const updatePropertyTransfer = async (req, res) => {
  const { propertyId } = req.params; // expects the property ID as stored in your DB and on-chain
  try {
    // Call the on-chain smart contract mapping to fetch property details
    const onChainProperty = await landRegistryContract.properties(propertyId);
    // onChainProperty is a struct with: 
    // { id, seller, owner, isListed, area, askingPrice, location, documentHash }
    
    // Update your backup DB with the latest on-chain owner and listing status.
    const { data, error } = await supabase
      .from('land')
      .update({
        owner: onChainProperty.owner,
        isListed: onChainProperty.isListed,
        // You can update additional fields if needed (e.g., location, askingPrice, etc.)
      })
      .eq('id', propertyId);

    if (error) return res.status(400).json({ error: error.message });

    return res.status(200).json({
      message: 'Property transfer updated from on-chain data',
      data,
      onChainProperty: {
        id: onChainProperty.id.toString(),
        seller: onChainProperty.seller,
        owner: onChainProperty.owner,
        isListed: onChainProperty.isListed,
        area: onChainProperty.area.toString(),
        askingPrice: onChainProperty.askingPrice.toString(),
        location: onChainProperty.location,
        documentHash: onChainProperty.documentHash,
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
