import React, { useState, useCallback } from 'react';
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Grow,
  useTheme
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
  VerifiedUser as VerifiedUserIcon
} from '@mui/icons-material';

const roles = [
  {
    label: 'Buyer',
    icon: <ShoppingCartIcon fontSize="large" />,
    color: 'primary',
    description: 'Purchase products and manage your orders'
  },
  {
    label: 'Seller',
    icon: <StoreIcon fontSize="large" />,
    color: 'secondary',
    description: 'List products and manage your store'
  },
  {
    label: 'Inspector',
    icon: <VerifiedUserIcon fontSize="large" />,
    color: 'success',
    description: 'Verify product authenticity and quality'
  },
];

const SelectAccountType = ({ onSelectRole }) => {
  const theme = useTheme();
  const [selectedRole, setSelectedRole] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);

  const handleSelectRole = useCallback((role) => {
    setSelectedRole(role);
    onSelectRole(role);
  }, [onSelectRole]);

  const RoleCard = useCallback(({ role }) => (
    <Grow in={true} timeout={500} appear>
      <Card
        elevation={hoveredRole === role.label ? 6 : 2}
        sx={{
          minHeight: 200,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: hoveredRole === role.label ? 'scale(1.05)' : 'scale(1)',
          border: selectedRole === role.label ? `2px solid ${theme.palette[role.color].main}` : 'none',
          opacity: hoveredRole && hoveredRole !== role.label ? 0.7 : 1
        }}
        onMouseEnter={() => setHoveredRole(role.label)}
        onMouseLeave={() => setHoveredRole(null)}
      >
        <CardActionArea 
          onClick={() => handleSelectRole(role.label)}
          sx={{ height: '100%' }}
          aria-label={`Select ${role.label} account type`}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 6,
              [theme.breakpoints.down('sm')]: { py: 4 }
            }}
          >
            <Box
              sx={{
                color: theme.palette[role.color].main,
                mb: 2,
                transition: 'transform 0.2s ease',
                transform: hoveredRole === role.label ? 'translateY(-5px)' : 'none'
              }}
            >
              {role.icon}
            </Box>
            
            <Typography variant="h6" component="div" gutterBottom>
              {role.label}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                opacity: 0.8,
                transition: 'opacity 0.2s ease',
              }}
            >
              {role.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  ), [hoveredRole, selectedRole, theme, handleSelectRole]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(45deg, #f8f9fa 30%, #e9ecef 90%)'
          : 'linear-gradient(45deg, #212121 30%, #424242 90%)'
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              letterSpacing: '-0.5px',
              [theme.breakpoints.down('sm')]: { fontSize: '2rem' }
            }}
          >
            Choose Your Role
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            Select your account type to get started with our platform
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {roles.map((role) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={role.label}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <RoleCard role={role} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default (SelectAccountType);