// models/Offer.js
import { DataTypes } from 'sequelize';
import  sequelize from '../config/database.js';

const Offer = sequelize.define('Offer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  propertyId: {
    type: DataTypes.INTEGER
  },
  offerPrice: {
    type: DataTypes.STRING  // Stored as string
  },
  escrowAmount: {
    type: DataTypes.STRING  // Stored as string
  },
  buyer: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.INTEGER  // Stores enum index (0: Pending, 1: SellerAccepted, etc.)
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

export default Offer;
