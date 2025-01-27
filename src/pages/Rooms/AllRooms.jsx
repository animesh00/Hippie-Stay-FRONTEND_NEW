import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Slider,
  Select,
  MenuItem,
  Button,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllStays = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Calculate max price from hotels data
  const maxPrice = useMemo(() => {
    if (hotels.length === 0) return 1000;

    return Math.max(
      ...hotels.map((hotel) =>
        hotel.priceRange ? parseInt(hotel.priceRange, 10) : 0
      )
    );
  }, [hotels]);

  // Update price range when maxPrice changes
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  // Fetch hotels from the API
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5001/api/hotels");
        setHotels(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch hotels. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const filteredHotels = useMemo(() => {
    return hotels
      .filter((hotel) => {
        // Filter by search term
        const matchesSearch = hotel.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        // Filter by price range
        const hotelPrice = parseInt(hotel.priceRange, 10);
        return (
          matchesSearch &&
          hotelPrice >= priceRange[0] &&
          hotelPrice <= priceRange[1]
        );
      })
      .sort((a, b) => {
        const aPrice = parseInt(a.priceRange, 10) || 0;
        const bPrice = parseInt(b.priceRange, 10) || 0;
        switch (sortBy) {
          case "price_low":
            return aPrice - bPrice;
          case "price_high":
            return bPrice - aPrice;
          case "rating":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [hotels, searchTerm, priceRange, sortBy]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
          background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container>
        <Grid container spacing={3}>
          {/* Sidebar Filters */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                p: 3,
                borderRadius: 2,
                color: "white",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search hotels"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: "white" }} />,
                  sx: {
                    color: "white",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255,255,255,0.5)",
                    },
                  },
                }}
                sx={{ mb: 2 }}
              />

              <Typography sx={{ color: "white", mt: 2, mb: 1 }}>
                Price Range (Rs.{priceRange[0]} - Rs.{priceRange[1]})
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue)}
                min={0}
                max={maxPrice}
                step={50}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `Rs.${value}`} // Updated to match Rs currency
                sx={{
                  color: "white",
                  "& .MuiSlider-valueLabel": {
                    backgroundColor: "white",
                    color: "primary.main",
                  },
                }}
              />

              <Typography sx={{ color: "white", mt: 2, mb: 1 }}>
                Sort By
              </Typography>
              <Select
                fullWidth
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{
                  color: "white",
                  "& .MuiSelect-icon": { color: "white" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.5)",
                  },
                }}
              >
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="price_low">Price: Low to High</MenuItem>
                <MenuItem value="price_high">Price: High to Low</MenuItem>
              </Select>
            </Box>
          </Grid>

          {/* Hotels List */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {filteredHotels.map((hotel) => (
                <Grid item xs={12} sm={6} lg={4} key={hotel._id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={hotel.hotelImage}
                      alt={hotel.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{hotel.name}</Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <StarIcon sx={{ color: "gold", mr: 0.5 }} />
                        <Typography>{hotel.rating}</Typography>
                      </Box>
                      <Typography sx={{ mt: 1, color: "text.secondary" }}>
                        {hotel.address}
                      </Typography>
                      <Typography sx={{ mt: 1, color: "text.secondary" }}>
                        {hotel.description}
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="h6">{hotel.priceRange}</Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => navigate(`/stay/${hotel._id}`)}
                        >
                          View Details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AllStays;
