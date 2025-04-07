import React, { useState, useEffect } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/system";
import Sidebar from "./Sidebar";
import Appbar from "./Appbar";
import axios from "axios";

const drawerWidth = 240;

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
}));

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    axios
      .get("/seller/dashboard")
      .then((res) => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data", error);
        // Set default values as "N/A" if error occurs
        setDashboardData({
          user: { name: "N/A", welcomeMessage: "N/A" },
          stats: { landsForSale: "N/A", pendingVerifications: "N/A" },
          transactions: [],
          dashboardImage: "N/A",
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Destructure the data received from the backend
  const { user, stats, transactions, dashboardImage } = dashboardData;

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar handleDrawerToggle={handleDrawerToggle} />
      <Sidebar />

      <MainContent component="main">
        <Toolbar />
        <Box
          sx={{
            backgroundColor: "#E8E1F3",
            p: 2,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            marginLeft: "-240px",
          }}
        >
          <Typography variant="h5" sx={{ pl: 2 }}>
            Welcome Back, {user.name}
            <br />
            {user.welcomeMessage}
          </Typography>
          <Box
            component="img"
            src={
              dashboardImage !== "N/A"
                ? dashboardImage
                : "https://via.placeholder.com/200"
            }
            alt="Dashboard Visual"
            sx={{ width: 200, height: "auto", borderRadius: 2 }}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3, marginLeft: "-240px" }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Lands For Sale</Typography>
                <Typography variant="h4">{stats.landsForSale}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">
                  Pending Verifications
                </Typography>
                <Typography variant="h4">
                  {stats.pendingVerifications}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mb: 2, marginLeft: "-240px" }}>
          Overview of the Transactions
        </Typography>
        <TableContainer component={Paper} sx={{ marginLeft: "-240px" }}>
          <Table aria-label="transaction table">
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    N/A
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </MainContent>
    </Box>
  );
};

export default Dashboard;
