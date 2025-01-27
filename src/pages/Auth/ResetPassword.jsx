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

export const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box sx={pageContainer}>
      <Container maxWidth="xs">
        <Paper sx={paperStyle}>
          <Typography variant="h4" sx={{ mb: 3, ...gradientBackground }}>
            Create New Password
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
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
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            }}
          >
            Reset Password
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;
