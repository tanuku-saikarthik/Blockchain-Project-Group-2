// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import { registerUser } from '../../API.js';
import { TextField, Button, Box, Typography, Grid, Paper, Alert } from '@mui/material';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role_id: '',       // e.g., "1" for user, "2" for admin; adjust as needed
    age: '',
    phone_number: '',
    pan_number: '',
    aadhaar_number: '',
    aadhaar_file_url: '',
    wallet_address: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');  // "info", "success", "error"

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setFormData((prev) => ({ ...prev, wallet_address: accounts[0] }));
        setMessageType('success');
        setMessage('Wallet connected successfully!');
      } catch (error) {
        setMessageType('error');
        setMessage('Failed to connect wallet. Please try again.');
      }
    } else {
      setMessageType('error');
      setMessage('MetaMask not detected. Please install MetaMask.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      setMessageType('success');
      setMessage(`Success: ${data.message}`);
    } catch (error) {
      setMessageType('error');
      setMessage(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9' }}>
      <Paper sx={{ padding: 4, maxWidth: 500, width: '100%', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333' }}>
          Register
        </Typography>
        
        {/* Display messages */}
        {message && (
          <Alert severity={messageType} sx={{ marginBottom: 2 }}>
            {message}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Full Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="full_name"
                label="Full Name"
                value={formData.full_name}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              />
            </Grid>
            
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              />
            </Grid>

            {/* Role ID */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="role_id"
                label="Role ID"
                value={formData.role_id}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              />
            </Grid>

            {/* Age */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              />
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="phone_number"
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              />
            </Grid>

            {/* PAN Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="pan_number"
                label="PAN Number"
                value={formData.pan_number}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              />
            </Grid>

            {/* Aadhaar Number */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="aadhaar_number"
                label="Aadhaar Number"
                value={formData.aadhaar_number}
                onChange={handleChange}
                required
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
              />
            </Grid>

            {/* Aadhaar File URL */}
           
            {/* Wallet Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={connectWallet}
                sx={{
                  backgroundColor: '#3b82f6',
                  '&:hover': { backgroundColor: '#2563eb' },
                  padding: '10px',
                  fontWeight: 'bold',
                  borderRadius: 1,
                  boxShadow: 2,
                }}
              >
                {formData.wallet_address ? `Connected: ${formData.wallet_address.substring(0, 6)}...${formData.wallet_address.slice(-4)}` : 'Connect Wallet'}
              </Button>
            </Grid>

            {/* Register Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  backgroundColor: '#10b981',
                  '&:hover': { backgroundColor: '#059669' },
                  padding: '10px',
                  fontWeight: 'bold',
                  borderRadius: 1,
                  boxShadow: 2,
                }}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
