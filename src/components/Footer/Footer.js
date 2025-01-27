// src/components/Footer.js
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Instagram, Twitter, Email } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" }}
    >
      <Box
        sx={{
          background: "rgba(0,0,0,0.1)",
          color: "white",
          py: 4,
        }}
      >
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">HippieSay</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Your ultimate travel companion for unique stays worldwide.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Quick Links</Typography>
              {[
                "About Us",
                "Privacy Policy",
                "Terms of Service",
                "FAQs",
                "Contact Us",
              ].map((link) => (
                <Typography key={link} variant="body2" sx={{ mt: 1 }}>
                  {link}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Connect With Us</Typography>
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <IconButton color="inherit">
                  <Facebook />
                </IconButton>
                <IconButton color="inherit">
                  <Instagram />
                </IconButton>
                <IconButton color="inherit">
                  <Twitter />
                </IconButton>
                <IconButton color="inherit">
                  <Email />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, background: "rgba(255,255,255,0.2)" }} />
          <Typography variant="body2" align="center">
            © 2024 HippieStay. All Rights Reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
