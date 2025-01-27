import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import axios from "axios";

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

const EmailVerified = () => {
  const [status, setStatus] = useState({ success: false, message: "" });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        setStatus({
          success: false,
          message: "Verification token is missing or invalid.",
        });
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5001/api/users/verify-email?token=${token}`
        );
        setStatus({ success: true, message: response.data.message });
      } catch (error) {
        setStatus({
          success: false,
          message:
            error.response?.data?.message ||
            "Something went wrong during the verification process.",
        });
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <Box sx={pageContainer}>
      <Container maxWidth="xs">
        <Paper sx={paperStyle}>
          {status.success ? (
            <>
              <CheckCircleOutline
                sx={{ fontSize: 100, color: "#2575fc", mb: 2 }}
              />
              <Typography variant="h5" sx={{ ...gradientBackground, mb: 2 }}>
                Email Verified!
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                {status.message}
              </Typography>
              <Button
                onClick={() => navigate("/login")}
                fullWidth
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                }}
              >
                Go to Login
              </Button>
            </>
          ) : (
            <>
              <ErrorOutline sx={{ fontSize: 100, color: "red", mb: 2 }} />
              <Typography variant="h5" color="error" sx={{ mb: 2 }}>
                Verification Failed
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                {status.message}
              </Typography>
              <Button
                onClick={() => navigate("/")}
                fullWidth
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                }}
              >
                Back to Home
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default EmailVerified;
