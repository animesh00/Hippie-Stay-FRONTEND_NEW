import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { ErrorOutline as ErrorIcon } from "@mui/icons-material";

const NotFound = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Container maxWidth="sm">
        <ErrorIcon
          sx={{
            fontSize: 120,
            color: "white",
            mb: 3,
          }}
        />
        <Typography
          variant="h2"
          sx={{
            color: "white",
            mb: 2,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            mb: 3,
          }}
        >
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.7)",
            mb: 4,
          }}
        >
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </Typography>
        <Button variant="contained" color="primary" href="/">
          Go to Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;
