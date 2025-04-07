// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  LinearProgress,
  Avatar,
  Chip
} from '@mui/material';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import Fingerprint from '@mui/icons-material/Fingerprint';
import CloudUpload from '@mui/icons-material/CloudUpload';
import { connectWallet, registerUser, loginUser } from '../api.js';

const AuthPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    age: '',
    aadharNumber: '',
    phoneNumber: '',
    panNumber: '',
    aadharFile: null,
  });

  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('signup');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    setFormData((prev) => ({ ...prev, aadharFile: file }));
  };

  const handleWalletConnect = async () => {
    setLoading(true);
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
      setError('');
    } else {
      setError('Wallet connection failed');
    }
    setLoading(false);
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await registerUser(formData, walletAddress);
    if (response.success) {
      alert('Registration successful!');
      navigate('/dashboard');
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await loginUser(walletAddress);
    if (response.success) {
      alert('Login successful!');
      navigate('/dashboard');
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  const truncateAddress = (address) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 8 }}>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
            <Box textAlign="center" mb={4}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mx: 'auto', mb: 2 }}>
                <Fingerprint fontSize="large" />
              </Avatar>
              <Typography variant="h4" component="h1" gutterBottom>
                {activeTab === 'signup' ? 'Create Account' : 'Welcome Back'}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Chip label="Sign Up" onClick={() => setActiveTab('signup')} color={activeTab === 'signup' ? 'primary' : 'default'} variant={activeTab === 'signup' ? 'filled' : 'outlined'} />
                <Chip label="Log In" onClick={() => setActiveTab('login')} color={activeTab === 'login' ? 'primary' : 'default'} variant={activeTab === 'login' ? 'filled' : 'outlined'} />
              </Box>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
            {loading && <LinearProgress sx={{ mb: 3 }} />}

            {activeTab === 'signup' ? (
              <Box component="form" onSubmit={handleSignupSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} required /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="Age" type="number" name="age" value={formData.age} onChange={handleInputChange} /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleInputChange} required /></Grid>
                  <Grid item xs={12} sm={6}><TextField fullWidth label="Aadhaar Number" name="aadharNumber" value={formData.aadharNumber} onChange={handleInputChange} required /></Grid>
                  <Grid item xs={12}>
                    <Button component="label" variant="outlined" fullWidth startIcon={<CloudUpload />}>
                      Upload Aadhaar
                      <input hidden type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
                    </Button>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  {walletAddress ? (
                    <Chip icon={<AccountBalanceWallet />} label={`Connected: ${truncateAddress(walletAddress)}`} color="success" variant="outlined" sx={{ mb: 2 }} />
                  ) : (
                    <Button variant="contained" onClick={handleWalletConnect} startIcon={<AccountBalanceWallet />} sx={{ mb: 2 }}>
                      Connect Wallet
                    </Button>
                  )}
                  <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}>Create Account</Button>
                </Box>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 2 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  {walletAddress ? (
                    <Chip icon={<AccountBalanceWallet />} label={`Connected: ${truncateAddress(walletAddress)}`} color="success" variant="outlined" />
                  ) : (
                    <Button variant="contained" onClick={handleWalletConnect} startIcon={<AccountBalanceWallet />}>Connect Wallet</Button>
                  )}
                </Box>
                <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}>Log In</Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthPage;
