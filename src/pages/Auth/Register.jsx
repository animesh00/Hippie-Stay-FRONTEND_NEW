import {
  AlternateEmail,
  LockOpen,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Show a pending toast
    const toastId = toast.loading("Processing...");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        formData
      );

      // Update the toast to success
      toast.update(toastId, {
        render: "User successfully created",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/register-success");
      }, 1000);
    } catch (error) {
      // Update the toast to error
      toast.update(toastId, {
        render: error.response.data.message || "Error registering user",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Box sx={pageContainer}>
      <Container maxWidth="xs">
        <Paper sx={paperStyle}>
          <Typography variant="h4" sx={{ mb: 3, ...gradientBackground }}>
            Create Account
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpen color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            }}
          >
            Sign Up
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
