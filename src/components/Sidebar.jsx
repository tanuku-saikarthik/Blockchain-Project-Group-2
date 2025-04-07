import React from "react";
import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const drawerWidth = 240;

const Sidebar = () => {
  // Define an array of navigation items with text and corresponding route paths.
  const navItems = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Add a Land", link: "/add-land" },
    { text: "View your Lands", link: "/view-lands" },
    { text: "Pending Verifications", link: "/pending-verifications" },
    { text: "Buyer offers", link: "/buyer-offers" },
    { text: "Logout", link: "/logout" },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          width: drawerWidth,
          maxWidth: "calc(100% - 40px)",
          height: "100%",
          backgroundColor: "lightblue",
          borderRadius: "25px",
          m: 2,
          mt: "64px",
          mb: "20px",
          p: 2,
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <List sx={{ m: 0, p: 0 }}>
          {navItems.map((item) => (
            <ListItem
              key={item.text}
              button
              component={Link}
              to={item.link}
              sx={{ mb: 1, p: 0 }}
            >
              <ListItemText
                primary={item.text}
                sx={{
                  "&:hover": { backgroundColor: "#cc99ff" },
                  borderRadius: "20px",
                  p: "10px",
                  fontWeight: "bolder",
                  pl: "15px",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
