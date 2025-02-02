import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Grid,
  Paper,
  Button,
  Divider,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authComtext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          "http://localhost:5001/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = async () => {
    if (isEditing) {
      try {
        const token = localStorage.getItem("accessToken");

        await axios.put(
          "http://localhost:5001/api/users/profile/edit",
          {
            name: profile.name,
            phone: profile.phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("User updated");
        setIsEditing(false);
      } catch (err) {
        toast.error("Failed to update profile. Please try again.");
      }
    } else {
      setIsEditing(true);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 3,
            p: 4,
            background: "white",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mr: 4,
                border: "4px solid #2575fc",
              }}
              src="/api/placeholder/120/120"
              alt="Profile Picture"
            />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background:
                    "linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {profile.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                User
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography>
                  <strong>Name:</strong> {profile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography>
                  <strong>Phone:</strong> {profile.phone}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <strong>Email:</strong> {profile.email}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={isEditing ? <Save /> : <Edit />}
              sx={{
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                "&:hover": { opacity: 0.9 },
              }}
              onClick={handleEdit}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
            <Button
              variant="outlined"
              startIcon={isEditing ? <Save /> : <Edit />}
              sx={{
                background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
                "&:hover": { opacity: 0.9 },
                color: "white",
              }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;
