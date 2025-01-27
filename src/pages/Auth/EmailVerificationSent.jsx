import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  LockOpen,
  AlternateEmail,
  CheckCircleOutline,
  MailOutline,
} from "@mui/icons-material";

// Common styling and theme elements
const gradientBackground = {
  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const pageContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
};

const paperStyle = {
  padding: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 3,
  background: "white",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
};

const EmailSent = () => {
  return (
    <Box sx={pageContainer}>
      <Container maxWidth="xs">
        <Paper sx={paperStyle}>
          <MailOutline sx={{ fontSize: 100, color: "#2575fc", mb: 2 }} />
          <Typography variant="h5" sx={{ ...gradientBackground, mb: 2 }}>
            Verify Your Email
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 3 }}>
            We've sent a verification email to your inbox. Please check your
            email and click the verification link.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            }}
          >
            Resend Verification Email
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default EmailSent;
