import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  Home,
  Hotel,
  AccountCircle,
  Bookmark,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom"; // Import necessary routing hooks
import { AuthContext } from "../../context/authComtext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  // console.log(accessToken);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate(); // Initialize navigate hook

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { icon: <Home />, text: "Home", path: "/" },
    { icon: <Hotel />, text: "Stays", path: "/stays" },
    // { icon: <Bookmark />, text: "Bookings", path: "/bookings/id" },
    // { icon: <AccountCircle />, text: "Profile", path: "/profile" },
  ];

  const handleNavigation = (path) => {
    if (path === "/") {
      navigate("/"); // Directly navigate to Home
    } else {
      navigate(path); // Navigate to the respective path
    }
  };

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => handleNavigation(item.path)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              background: "linear-gradient(45deg, #fff 30%, #e0e0e0 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            onClick={() => handleNavigation("/")} // Navigate to Home when clicked
          >
            HippieStay
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  startIcon={item.icon}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  }}
                  onClick={() => handleNavigation(item.path)} // Add navigation on button click
                >
                  {item.text}
                </Button>
              ))}
              {currentUser ? (
                <>
                  {" "}
                  <Button
                    color="inherit"
                    startIcon={<Bookmark />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                      },
                    }}
                    onClick={() => handleNavigation("/bookings")}
                  >
                    Bookings
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={<AccountCircle />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                      },
                    }}
                    onClick={() => handleNavigation("/profile")}
                  >
                    Profile
                  </Button>
                </>
              ) : (
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  }}
                  onClick={() => handleNavigation("/login")}
                >
                  Sign In
                </Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "white",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
