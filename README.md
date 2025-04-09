# Land Registration System using Blockchain

A **decentralized web application** for secure, transparent, and automated land registration using blockchain technology. This system ensures trusted interactions among **buyers**, **sellers**, and **inspectors** through **smart contracts** and a **role-based interface**.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)

---

## Overview

This project streamlines the **land registration process** by eliminating the need for a central authority. It uses **blockchain** to maintain an immutable ledger of transactions and integrates **smart contracts** to automate escrow management, ownership transfers, and validation processes. With **role-based dashboards** for buyers, sellers, and inspectors, the platform enhances **transparency** and **trust** among all stakeholders.

---

## Key Features

- **Blockchain Ledger**: Immutable record of land transactions.
- **Smart Contracts**: Automates escrow, validation, and ownership transfer.
- **Role Management**:
  - **Buyer**: Registers, views land, makes offers.
  - **Seller**: Registers, uploads land details, approves offers.
  - **Inspector**: Verifies transactions.
- **Escrow System**: Buyer funds held until transaction is verified and land is transferred.
- **Supabase Integration**: Handles cloud database and authentication.
- **MetaMask & Ethers.js**: For wallet-based login and Web3 transactions.

---

## Technologies Used

### 🧠 Languages
- JavaScript
- Solidity

### ⚙ Frameworks / Libraries
- **Frontend**: React.js, react-router-dom
- **Backend**: Express.js
- **Blockchain Dev**: Hardhat, Ethers.js, OpenZeppelin

### 🔐Authentication && Authorization
- bcrypt
- JSON Web Tokens (JWT)

### ☁ Cloud & APIs
- Supabase (auth + database)
- REST APIs

### 🧪 Developer Tools
- dotenv
- multer (file uploads)
- web-vitals (performance)
---

## Installation & Setup

### Prerequisites

- Node.js and npm
- MetaMask extension (browser wallet)
- Supabase project (get `SUPABASE_URL` and `SUPABASE_ANON_KEY`)

### Clone the Repository

```bash
git clone <repository_url>
cd <repository_directory>
```

### Install Dependencies
```bash
npm install
```
### Environment Configuration
Create a .env file in the root containing below details :
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Compile Smart Contracts
```bash
npx hardhat compile
```
### Deploy Smart Contracts Locally
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Start Hardhat Node (in separate terminal)
```bash
npx hardhat node
```

### Start the Web App
```bash
npm start
```

---

## Usage

### 🔐 Registration & Login
- Buyers and sellers register through the web app.
- Inspector uses pre-configured credentials.

### 🏠 Add Land (Seller)
- Sellers upload property details and documents.

### 🔍 Land Verification (Inspector)
- Inspector reviews and verifies seller and land info.

### 💰 Make Offer (Buyer)
- Buyer browses verified land and submits an offer.

### ✅ Approve Offer (Seller)
- Seller reviews and approves buyer’s offer.

### 🔒 Smart Contract Escrow
- Buyer's funds are locked in escrow via smart contract.

### 🔄 Ownership Transfer
- Inspector validates the transaction and triggers transfer.

### 💸 Fund Release
- Ownership is updated, and funds are released to the seller.



